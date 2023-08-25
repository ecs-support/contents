Public Function TrimCrLf(aStr)
   Dim t , pt
   
   pt = 0
   For t = Len(aStr) To 1 Step -1
      If Asc(Mid(aStr, t, 1)) > 32 Then Exit For
      pt = t - 1
   Next
   If pt > 0 Then
      TrimCrLf = Left(aStr, pt)
   Else
      TrimCrLf = aStr
   End If
End Function

Sub OnFormat
    dim duty_amt,PackUnit,TotalNW,TotalGW,TotalQty,TotalInvQty,TotalPackQty,IsShort
   IsAfterShort = vba.StaticVarGetValue("IsAfterShort")
   IsShowEndDatePermit = vba.StaticvarGetValue("ShowEndDatePermit")
   ShowGrossDetail = VBA.StaticVarGetValue("ShowGrossDetail")
   ShowOtherRemark = VBA.StaticVarGetValue("ShowOtherRemark")
   if ShowGrossDetail = "1" then
	rpt.txtDGrossW.visible = true
	rpt.Label4.visible = true
   else
	rpt.txtDGrossW.visible = false
	rpt.Label4.visible = false
   end if
   Set ResD = rpt.DataControl1.Recordset
'...หาชื่อหน่วยของPack
  ' if MasterInfo.GetUnitCode("" & ResD("PackUnit")) = true then  
    sqltext = "Select  Name from Mas_REFPKG where Code = '" &  ResD("PackUnit").value & "'"
          set resPK = dbo.OpenRecordset("ResPK",SQLText)
     if not(respk.eof = true and respk.bof = true) then
           PackUnit = trim(Ucase(resPK("Name").value))
   else
	PackUnit =""
    end if
  '    PackUnit =Ucase( MasterInfo.ResMasUnitCode("TName"))
   'end if
'............
   ' .. if amount > 1 then append 'S' in unit name.
   PackAmt = ResD("PackAmount").value  'จำนวน Pack
   NetW = ResD("NetWeight").value ' NetWeight
   GrossW = ResD("GrossWeight").value
   TariffQty = ResD("TariffQty").value 'ปริมาณตามพิกัด
   TariffUnit = ResD("TariffUnit").value 'หน่วยปริมาณตามพิกัด
   FOBPrice = ResD("DSalesFOBPrice").value  ' ราคา FOB/F
   FOBPriceTHB = ResD("DSalesFOBPriceTHB").value  'ราคา FOB/B
   InvQty = ResD("SalesPackQty").value ' ปริมาณตาม invoice
   InvUnit = ResD("SalesPackUnit").value ' หน่วยปริมาณตาม invoice
   rpt.txtDRemark.Text = ResD("DRemark").value  'หมายเหตุ
   IsShort = false
   rpt.labShort.Visible = false
   if rpt.txtTSalesCur.Tag = "" then rpt.txtTSalesCur.Tag = rpt.txtSalesCur.Text
   '.. Multi Currency
   if rpt.txtSalesCur.Text <> rpt.txtTSalesCur.Tag then 
      rpt.txtTSalesCur.Visible = false
      rpt.txtTFOBValueF.Visible = false
      rpt.txtFOBF_Multi.Visible = true
   end if
'.....................
'...........ถ้าต้องการโชว์ยอดหลังตัดshort ไปดึงข้อมูลการตัด short โดยจะเอายอดที่ส่งออกจริงมาแทน ยอดตามใบขน
   if IsAfterShort = 1 then 
      SQLText = "select * from GTL_ShortShipD where RefNO='" & ResD("RefNO").value & "' AND DecItemNo=" & ResD("DecItemNO").value
      set s = dbo.OpenRecordset("ShortD",SQLText)
      if not (s.eof = true and s.bof = true) then 
         if s("NonGrossW").value <> 0 or s("NonRGrossW").value <> 0 or s("NonPackAmt").value <> 0 or s("NonProductQty").value <> 0 or s("NonFOBPrice").value <> 0 then
            'if s("RelPackAmt").value > 0 then 
		PackAmt = s("RelPackAmt").value
		GrossW = s("RelRGrossW").value
            'if s("RelGrossW").value > 0 then 
		NetW = s("RelGrossW").value
            'if s("RelProductQty").value > 0 then 
               InvQty = s("RelProductQty").value
               TariffQty = InvQty
               InvUnit = s("DecProductQtyUnit").value
               TariffUnit = InvUnit
            'end if
            'if s("RelFOBPrice").value > 0 then
               FOBPrice = s("RelFOBPrice").value
               FOBPriceTHB = vba.Format(App.CalcExchangeRate(ResD("SalesCur").value,FOBPrice,ResD("SalesRate").value),"#0.0000")
            'end if
            rpt.labShort.Visible = true   
             rpt.labAfterShort.Visible = true
            IsShort = true
         end if
      end if
      dbo.CloseRecordset("ShortD")
      set s = nothing
   end if
'...............................................................................................
' .............................ดูจำนวน Pack ว่ามากกว่า 1 หรือเปล่า ถ้ามากกว่า ก็ให้เติม S หลังชื่อหน่วยPack แต่ถ้าหน่วยของPack ลงท้ายด้วย X ให้ใส่ ES
   if PackAmt > 1 then
      if ucase(right(PackUnit,1)) <> "S" then
         if ucase(right(PackUnit,1)) = "X" then PackUnit = PackUnit & "E"
         PackUnit = PackUnit & "S"
      end if
   end if
'..........................................
  if left( ResD("BrandName").value,1) = chr(34) then
  bname = " BRAND  " &  ResD("BrandName").value
else
   bname = " BRAND  " & chr(34) & ResD("BrandName").value & chr(34)  ' ยี่ห้อสินค้า  
end if
   rpt.txtDBrand.Text = bname
   rpt.txtDPackAmt.DataValue = PackAmt        'จำนวนPack 
    rpt.txtDPackCode.Text = ""
   if ResD("PackUnit").value <> "" then   rpt.txtDPackCode.Text = "(" &ResD("PackUnit").value & ")"
   rpt.txtDPackUnit.Text = PackUnit    'หน่วยของ Pack
   rpt.txtDNetW.DataValue = NetW  'NetWeight
   rpt.txtDGrossW.DataValue = GrossW
   rpt.txtDQty.DataValue = TariffQty ' ปริมาณตามใบขน
   rpt.txtDQtyUnit.Text = TariffUnit ' หน่วยปริมาณตามใบขน
   rpt.txtDFOBValueF.DataValue = FOBPrice  ' ราคา FOB/F
   rpt.txtDFOBValueB.DataValue = FOBPriceTHB  'ราคา FOB/B
   rpt.txtPackOther.Text = ResD("ProductAttribute1").value   ' ลักษณะสินค้า1
   rpt.txtDStat.Text =  ResD("TariffCode").value 'พิกัดศุลกากร
   rpt.txtOrigin.text = "Origin : " & ResD("DOriginalCountry").value  'ประเทศกำเนิดสินค้า
   rpt.txtYear.Text = "ปีสินค้า : " &ResD("ProductYear").value   ' ปีของสินค้า
   if left(rpt.txtDStat.Text,4) = "0000" then rpt.txtDStat.Text = mid(rpt.txtDStat.Text,5) ' ถ้า4ตัวแรกเป้น0000 ให้ตัดออก
'............หารหัสสถิติ หน่วยตามพิกัด
   SQLText = "select * from Mas_REFTRS where TariffClass='" & ResD("TariffCode").value & "' AND StatCode='" & ResD("StatCode").value & "'"
   set r = dbo.OpenRecordset("TRS",SQLText)
   if not (r.eof = true and r.bof = true) then
      rpt.txtDStat2.Text = ResD("StatCode").value & " / " & r("UnitCode").value    
   else
      rpt.txtDStat2.Text = ResD("StatCode").value & " / " & ResD("TariffUnit").value
   end if
   dbo.CloseRecordSet("TRS")
   set r = nothing
'........................................................................

   rpt.txtDutyRate.Text = app.GetExportDutyRate(ResD("BranchCode").value,ResD("RefNO").value,ResD("InvNO").value,ResD("ItemNo").value,ResD("TariffUnit").value,duty_amt) 'Rate อากรขาออก
   rpt.txtDDutyAmt.DataValue = duty_amt 'ค่าอากรขาออก
'   ....... หาก เป็นยอด short จะไม่โชว์ยอดปริมาณตามinvoice
   if IsShort = false then 
      rpt.txtInvQty.Text = "(" & vba.format(InvQty,"#,##0.0000") & " " & InvUnit & ")"
   else
      rpt.txtInvQty.Text = ""
   end if
'........................................................
   if rpt.txtDQtyUnit.Text = InvUnit then rpt.txtInvQty.Text = ""
   if rpt.txtDPackAmt.DataValue = 0 then 
      rpt.txtDPackAmt.Text = ""
      rpt.txtDPackUnit.Text = ""
   end if
   rpt.txtDSpc1.Text = ""
   'for t = 1 to 5
      'rpt.Detail.Controls("txtMark" & t).Text = ""
      'rpt.Detail.Controls("txtDPdt" & t).Text = ""
      'rpt.Detail.Controls("txtDSpc" & t).Text = ""
   'next
   'a = split(TrimCrLf("" & ResD("DShippingMark").value),chr(10))
   'for t = 0 to ubound(a)
   '   ndx = t + 1
   '   if ndx > 5 then exit for
   '   rpt.Detail.Controls("txtMark" & ndx).Text = a(t)
   'next
   rpt.txtMark1.Text = TrimCrLf("" & ResD("DShippingMark").value)  'shippingMark
'   a = split(TrimCrLf("" & ResD("PdtDescriptionE").value) & chr(10) & ResD("PdtDescriptionT").value,chr(10))
'   for t = 0 to ubound(a)
'      ndx = t + 1
'      if ndx > 5 then exit for
'      rpt.Detail.Controls("txtDPdt" & ndx).Text = a(t)
'   next
   rpt.txtDPdt1.Text = TrimCrLf("" & ResD("PdtDescriptionE").value) & vbcrlf & TrimCrLf("" & ResD("PdtDescriptionT").value) 'ชื่อสินค้าภาษาอังกฤษ ต่อด้วยชื่อสินค้าภาษาไทย
   if ResD("RTCProductCode").value<>"" or ResD("ProductAttribute1").value<>"" or ResD("ProductAttribute2").value<>"" then rpt.txtDPdt1.Text = rpt.txtDPdt1.Text & vbcrlf & ResD("RTCProductCode").value &"  "& ResD("ProductAttribute1").value &" "& ResD("ProductAttribute2").value
   if rpt.txtDRemark.text <> "" then rpt.txtDPdt1.Text = rpt.txtDPdt1.Text & vbcrlf & rpt.txtDremark.Text

 '........Get Permit Detail

 sqltext ="select * from DecX_DeclarePermit where Branchcode = '" & ResD("BranchCode").value &"' and RefNo = '"& ResD("RefNo").value &"' and InvNo = '"& ResD("InvNo").value &"' and InvItemNo = '"& ResD("ItemNo").value &"'"
   set rPermit = dbo.OpenRecordset("rPermit",SQLText)
    rpt.txtPermitDetail.datavalue =""

 sbuff = ""
   do while not rPermit.eof
   	if not (rPermit.eof = true and rPermit.bof = true) then
          		SQLText = "select * from Mas_RFPMS where TaxNumber='" & rpt.txtExpTaxNo.Text & "' AND PermitID='" & rPermit("PermitNO").value & "'"
          		set p = dbo.Openrecordset("Issue",SQLtext)
          		if not (p.eof = true and p.eof = true) then
              			SQLText = "select * from Mas_PermitIssue where IssueBy='" & p("PermitIssue").value & "'"
              			set i = dbo.OpenRecordset("IssueBy",SQLText)
              			if not (i.eof = true and i.bof = true) then
   				if IsShowEndDatePermit = "1" then
					rpt.txtPermitDetail.Text = rpt.txtPermitDetail.Text & " " & rPermit("PermitNO").value& " "& vba.showdate(rPermit("IssueDate").value,"TH") & " - " &  vba.ShowDate(p("FinishDate").value,"TH")  & " "  & rPermit("PermitIssue").value  &", "
				else
                                                         		rpt.txtPermitDetail.Text = rpt.txtPermitDetail.Text & " " & rPermit("PermitNO").value& " "& vba.showdate(rPermit("IssueDate").value,"TH") & " "  & rPermit("PermitIssue").value  &", "
                                      		end if
			else
				if IsShowEndDatePermit = "1" then
					rpt.txtPermitDetail.Text = rpt.txtPermitDetail.Text & " " & rPermit("PermitNO").value& " "& vba.showdate(rPermit("IssueDate").value,"TH") & " - " &  vba.ShowDate(p("FinishDate").value,"TH")  & " "  & rPermit("PermitIssue").value  &", "
				else
                                                 		rpt.txtPermitDetail.Text = rpt.txtPermitDetail.Text & " " & rPermit("PermitNO").value& " "& vba.showdate(rPermit("IssueDate").value,"TH") & " "  & rPermit("PermitIssue").value  &", "
				end if                                       	
			end if
                            	else
		     	 rpt.txtPermitDetail.Text = rpt.txtPermitDetail.Text & " " & rPermit("PermitNO").value & " "& vba.showdate(rPermit("IssueDate").value,"TH") & " "  & rPermit("PermitIssue").value  &", "
                           	end if
                           	dbo.CloseRecordset("PermitNo")
                           	 set p = nothing
                end if
    	 	
     rPermit.movenext
   loop
   if rpt.txtPermitDetail.text <> "" then
      rpt.txtPermitDetail.text = left(  rpt.txtPermitDetail.text,len( rpt.txtPermitDetail.text)-2)
   end if
 
'............................................................
 sbuff = ""
  rpt.txtCharge.text =""
'...........Get สิทธิประโยชน์ในแต่ละรายการ
   if ResD("IsComp").value then sbuff = "ขอเงินชดเชย:" & rpt.txtComp.Text & chr(13)
   BOILicenseNo = "" & ResD("BOILicenseNo").value
   if BOILicenseNo <> "" then sbuff = sbuff & "BOI:" & BOILicenseNo & " " & ResD("BOITranferNo").value & chr(13)
    FormulaNo = "" & ResD("FormulaNo").value
   if FormulaNo <> "" then sbuff = sbuff & "มาตรา29:" & FormulaNo & ModelNumber & chr(13) & "V." & ResD("ModelVersion").value  & " Tax. " & ResD("ModelCmpTax").value & chr(13)
 '  BIS19TransferNo = "" & ResD("BIS19TransferNo").value
  '  ModelNumber = "" & ResD("ModelNumber").value
 '  if ModelNumber<> "" then sbuff = sbuff & " 19ทวิ:" & ModelNumber & " " & ResD("ModelVersion").value & " " & ResD("ModelCmpTax").value & chr(13)
   BIS19TransferNo = "" & ResD("BIS19TransferNo").value
   if BIS19TransferNo <> "" then sbuff = sbuff & "โอนสิทธ์ " & BIS19TransferNo & chr(13)
   BondFormulaNo = "" & ResD("BondFormulaNo").value
   if Resd("IsBorn").value>0 then 
      sbuff = sbuff & "BOND"
     if ResD("BornModelVersion").value <> "" or ResD("BornModelTaxNo").value <> "" then sbuff = sbuff &  ":" & BondFormulaNo & " " & ResD("BornModelVersion").value & " " & ResD("BornModelTaxNo").value  & chr(13)
  end if
  if ResD("IsFreeZone").value then sbuff = sbuff & "Free Zone" & chr(13)
   if ResD("IsEPZ").value then sbuff = sbuff & "EPZ" & chr(13)
   if ResD("IsReImport").value then sbuff = sbuff & "สุทธินำกลับ" & chr(13)
 '  if ResD("IsFreeOfChage").value then   rpt.txtCharge.text = "NO COMMERCIAL VALUE " ' sbuff = sbuff & " ของแถม" & chr(13)
   if ResD("IsFreeOfChage").value then 
	  sbuff = sbuff & " NO COMMERCIAL VALUE " & chr(13)
	rpt.txttmpFree.text = "1"
 else
	rpt.txttmpFree.text = "0"
  end if

   if ResD("IsReExport").value then sbuff = sbuff & "Re-Export" & chr(13)
   if ResD("ImpTaxIncentive").value <> "" then sbuff = sbuff & "" & ResD("ImpTaxIncentive").value & chr(13)
   ImpDecNO = "" & ResD("ImpDecNO").value
   if ImpDecNO <> "" then   rpt.txtCharge.text = rpt.txtCharge.text & "เลขที่ใบขนขาเข้า" &   ImpDecNO & " รายการที่ " & ResD("ImpDecItem").value 
 'rpt.txtImpTaxIncentive.text=""
  ' if ResD("ImpTaxIncentive").value <> "" then rpt.txtImpTaxIncentive.text= "ImpTax." &  ResD("ImpTaxIncentive").value
 ' sbuff = sbuff & " ใบขนฯ:" & ResD("ImpDecNO").value & chr(13) & " (รายการที่ " & ResD("ImpDecItem").value & " )" & chr(13)
'   Tstr = app.InsertCrLf(sbuff,30)
'   a = split(sbuff,chr(13))
'   a = split(Tstr,chr(13))
   rpt.txtDSpc1.Text = sbuff
'........................................................................ 

'   for t = 0 to ubound(a)
'      ndx = t + 1
'      if ndx > 5 then exit for
'      rpt.Detail.Controls("txtDSpc" & ndx).Text = trim(a(t))
'   next
   C62Name = vba.format(InvQty,"#0.0000") & " " & InvUnit      'ปริมาณตาม invoice ต่อด้วยหน่วยของ invoice
   rpt.txtTemp1.Text = C62Name
   rpt.txtTemp2.Text = resD("PackUnit")
   rpt.txtRemark.Text = ""
   rpt.txtDInvNo.Text =   ResD("ItemNo").value & "/Inv." & ResD("InvNO").value   
   if vba.StaticVarGetValue("DecMaxItem") = ResD("DecItemNo").value then
      set ResH = dbo.GetRecordset("DecHeader")
'.........ดึงข้อมูล บันทึกเพิ่มเติม
      if trim("" & ResH("TextNote").value) <> "" then 
         rpt.txtRemark.Text = chr(13) & ResH("TextNote").value
         rpt.GroupFooter1.Visible = false
       end if
 ' ####ใส่เลข Invoice ที่บันทึกเพิ่มเติม กรณีเลข Invoice ยาวเกิน 235 ตัวอักษร
        numberLetterI = 235
        if len(trimCrLF(rpt.txtInvNo.Text))> numberLetterI then
            if  rpt.txtRemark.Text  <> "" then  
                rpt.txtRemark.Text  = "INVOICE NO:-" & vbcrlf & trim(trimCrLF(rpt.txtInvNo.Text)) &   vbcrlf & "-------------------------------------------------------------------------------------------------------------------------------------------------------------------------------------" & vbcrlf & rpt.txtRemark.Text  
            else
               rpt.txtRemark.Text  = "INVOICE NO:-" & vbcrlf & trim(trimCrLF(rpt.txtInvNo.Text)) & rpt.txtRemark.Text   
            end if
           rpt.GroupFooter1.Visible = true
        end if
  '###########
      if ShowOtherRemark = "1" then 
	rpt.GroupFooter1.Visible = true
     else
      	' select case ResH("DocStatus").value' ดูตาม status ใบขน ถ้าเป็น status 04จะไม่โชว์บรรทึกเพิ่มเติม
               ' 	case 1,2,3: 
         '			rpt.GroupFooter1.Visible = true
         '       	case 4: 
         			rpt.GroupFooter1.Visible = false
    ' 	 end select 
     end if 
     if rpt.txtRemark.Text = "" then
	 rpt.GroupFooter1.Visible = false
'   else
'	rpt.GroupFooter1.Visible = true
   end if
   end if
   set ResD = nothing

End Sub

Sub OnBeforePrint
'..................................ยอดรวม ต่างๆที่โชว์ล่างใบขน
  ChkSumFree= vba.StaticVarGetValue("ChkSumFree")

   select case  ChkSumFree 
	case "0":
		rpt.txtFOBF_Multi.Text = MasterInfo.SumMultiUnit(rpt.txtFOBF_Multi.Text,rpt.txtDFOBValueF.DataValue,rpt.txtSalesCur.Text,";","#,##0.00")
   		rpt.txtTFOBValueF.DataValue = rpt.txtTFOBValueF.DataValue + cdbl("0" & rpt.txtDFOBValueF.text)
   		rpt.txtTFOBValueB.DataValue = rpt.txtTFOBValueB.DataValue + cdbl("0" & rpt.txtDFOBValueB.Text)
	case   "1"   
     		if    rpt.txttmpFree.text = "0"   then
                                             '     msgbox 
   			rpt.txtFOBF_Multi.Text = MasterInfo.SumMultiUnit(rpt.txtFOBF_Multi.Text,rpt.txtDFOBValueF.DataValue,rpt.txtSalesCur.Text,";","#,##0.00")
   			rpt.txtTFOBValueF.DataValue = rpt.txtTFOBValueF.DataValue + cdbl("0" & rpt.txtDFOBValueF.text)
   			rpt.txtTFOBValueB.DataValue = rpt.txtTFOBValueB.DataValue + cdbl("0" & rpt.txtDFOBValueB.Text)
   		end if
	case else
		if    rpt.txttmpFree.text = "0"   then
   			rpt.txtFOBF_Multi.Text = MasterInfo.SumMultiUnit(rpt.txtFOBF_Multi.Text,rpt.txtDFOBValueF.DataValue,rpt.txtSalesCur.Text,";","#,##0.00")
   			rpt.txtTFOBValueF.DataValue = rpt.txtTFOBValueF.DataValue + cdbl("0" & rpt.txtDFOBValueF.text)
   		end if
		rpt.txtTFOBValueB.DataValue = rpt.txtTFOBValueB.DataValue + cdbl("0" & rpt.txtDFOBValueB.Text)
  end select
   rpt.txtDDutyAmt1.DataValue = rpt.txtDDutyAmt1.DataValue + rpt.txtDDutyAmt.DataValue
   rpt.txtTDutyAmt.DataValue = rpt.txtTDutyAmt.DataValue + rpt.txtDDutyAmt.DataValue
   
   TotalGW = vba.StaticVarGetValue("TotalGW")
   TotalNW = vba.StaticVarGetValue("TotalNW")
   TotalQty = vba.StaticVarGetValue("TotalQty")  
   TotalInvQty = vba.StaticVarGetValue("TotalInvQty")
   TotalPackQty = vba.StaticVarGetValue("TotalPackQty")

   TotalGW = MasterInfo.SumMultiUnit(""& TotalGW,rpt.txtDGrossW.DataValue,rpt.txtDNetWUnit.Text,,"#,##0.000")
   TotalNW = MasterInfo.SumMultiUnit(""& TotalNW,rpt.txtDNetW.DataValue,rpt.txtDNetWUnit.Text,,"#,##0.000")
   TotalQty = MasterInfo.SumMultiUnit("" & TotalQty,rpt.txtDQty.DataValue,rpt.txtDQtyUnit.Text,,"#,##0.000")
   TotalPackQty = MasterInfo.SumMultiUnit("" & TotalPackQty,rpt.txtDPackAmt.DataValue,rpt.txtTemp2.Text)
   TotalInvQty = MasterInfo.SumMultiUnitStr("" & TotalPackQty,"" & rpt.txtTemp2.Text,,"#,##0.000")

   rpt.txtTotalGW.Text = "Total G/W=" & TotalGW
   rpt.txtTotalNW.Text = "Total N/W=" & TotalNW
   rpt.txtTotalDecQty.Text = "Total Qty=" & TotalQty
   rpt.txtTotalInvQty.Text = "Total Inv Qty=" & TotalInvQty
   rpt.txtTotalPackQty.Text = "Total Pack Qty=" & TotalPackQty
   
   call vba.StaticVarSetValue("TotalGW",TotalGW)
   call vba.StaticVarSetValue("TotalNW",TotalNW)
   call vba.StaticVarSetValue("TotalQty",TotalQty)
   call vba.StaticVarSetValue("TotalInvQty",TotalInvQty)
   call vba.StaticVarSetValue("TotalPackQty",TotalPackQty)  
'....................................................................
End Sub
