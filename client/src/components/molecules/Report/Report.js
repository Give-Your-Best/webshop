import React, { useContext } from "react";
import { AppContext } from '../../../context/app-context';
import { Notification } from '../../atoms';
import { StyledForm, StyledDatePicker, StyledSubmitButton, ReportWrapper } from './Report.styles';
// import { clothingSizeOptions, shoeSizeOptions } from '../../../utils/constants';
import { downloadWorkbook, formatDate } from '../../../utils/helpers';
import { Formik } from 'formik';
import { getReportData } from "../../../services/statistics";
const ExcelJS = require('exceljs');

export const Report = () => {
    const { token } = useContext(AppContext);
    var res = {}

    const handleGenerate = async (values, {resetForm}) => {
        console.log(values);

        if (values.dateRange) {
            res = await getReportData((values.dateRange.length)? values.dateRange[0]: '', (values.dateRange.length)? values.dateRange[1]: '', token);
        }

        if (res.success) {
            console.log('success?')
            console.log(res);

            //set up excel parameters
            const workbook = new ExcelJS.Workbook();
            workbook.creator = 'Give Your Best UK';
            workbook.name = (values.dateRange && values.dateRange.length)? 'Give Your Best Webshop Report ' + formatDate(values.dateRange[0]) + ' to ' + formatDate(values.dateRange[1]): 'Give Your Best Webshop Report';

            // Add sheets
            const sheet = workbook.addWorksheet('General');
            const sheetTwo = workbook.addWorksheet('Category');
            // const sheetThree = workbook.addWorksheet('Size');

            // general worksheet
            sheet.columns = [
                { key: 'name', width: 50 },
                { key: 'value', width: 20}
            ];

            sheet.getCell('A1').value = {
                'richText': [
                  {'font': {'bold': true, 'name': 'Calibri', 'scheme': 'minor' },'text': 'Give Your Best Webshop Report'}
                ]
            };

            if (values.dateRange && values.dateRange.length) {
                sheet.getCell('A2').value = {
                    'richText': [
                      {'font': {'bold': true, 'name': 'Calibri', 'scheme': 'minor' },'text': formatDate(values.dateRange[0]) + ' to ' + formatDate(values.dateRange[1])}
                    ]
                };
            }

            sheet.getCell('A3').value = {
                'richText': [
                  {'font': {'bold': true },'text': ''}
                ]
            };

            sheet.addRow({name: 'Number of Shoppers', value: res.data.shopperCount || 0});
            sheet.addRow({name: 'Number of converted Shoppers', value: res.data.shopperConvertedCount || 0});

            sheet.addRow({name: '', value: ''});

            sheet.addRow({name: 'Number of Donors', value: res.data.donorCount || 0});
            sheet.addRow({name: 'Number of converted Donors', value: res.data.donorConvertedCount || 0});

            sheet.addRow({name: '', value: ''});


            sheet.addRow({name: 'Number of Items uploaded', value: res.data.itemsCount || 0});
            sheet.addRow({name: 'Number of Items shopped', value: res.data.itemsShopped || 0});
            sheet.addRow({name: 'Number of unique Shoppers', value: res.data.uniqueShoppers || 0});



            // category worksheet
            sheetTwo.columns = [
                { header: 'Category', key: 'category', width: 30 },
                { header: 'Number of items uploaded', key: 'uploaded', width: 25},
                { header: 'Number of items shopped', key: 'shopped', width: 25},
                { header: (!values.dateRange || !values.dateRange.length)? 'Number of items available': '', key: 'available', width: 25},
            ];

            sheetTwo.getCell('A1').font = {
                name: 'Calibri',
                bold: true,
            };
            sheetTwo.getCell('B1').font = {
                name: 'Calibri',
                bold: true,
            };
            sheetTwo.getCell('C1').font = {
                name: 'Calibri',
                bold: true,
            };
            sheetTwo.getCell('D1').font = {
                name: 'Calibri',
                bold: true,
            };

            res.data.categories.forEach(c => {
                sheetTwo.addRow({category: c._id, uploaded: c.total || 0, shopped: c.shopped || 0, available: c.available || ''});
            });

            sheetTwo.addRow({category: '', uploaded: '', shopped: '', available: ''});
            sheetTwo.addRow({category: '', uploaded: '', shopped: '', available: ''});

            res.data.subCategories.forEach(c => {
                sheetTwo.addRow({category: c._id, uploaded: c.total || 0, shopped: c.shopped || 0, available: c.available || ''});
            });

            // size worksheet
            // sheetThree.columns = [
            //     { header: 'Size', key: 'size', width: 30 },
            //     { header: 'Number of items uploaded', key: 'uploaded', width: 25},
            //     { header: 'Number of items shopped', key: 'shopped', width: 25},
            //     { header: (!values.dateRange || !values.dateRange.length)? 'Number of items available': '', key: 'available', width: 25},
            // ];

            // sheetThree.getCell('A1').font = {
            //     name: 'Calibri',
            //     bold: true,
            // };
            // sheetThree.getCell('B1').font = {
            //     name: 'Calibri',
            //     bold: true,
            // };
            // sheetThree.getCell('C1').font = {
            //     name: 'Calibri',
            //     bold: true,
            // };
            // sheetThree.getCell('D1').font = {
            //     name: 'Calibri',
            //     bold: true,
            // };

            // res.data.clothingSizes.forEach(c => {
            //     sheetThree.addRow({size: c._id, uploaded: c.total || 0, shopped: c.shopped || 0, available: c.available || ''});
            // });

            // sheetThree.addRow({size: '', uploaded: '', shopped: '', available: ''});
            // sheetThree.addRow({size: '', uploaded: '', shopped: '', available: ''});

            // res.data.shoeSizes.forEach(c => {
            //     sheetThree.addRow({size: c._id, uploaded: c.total || 0, shopped: c.shopped || 0, available: c.available || ''});
            // });

            //create link and download excel
            downloadWorkbook(workbook);
            // resetForm();
        } else {
            Notification('Error', res.message, 'error')
        }
        return true
    }

  return (
    <ReportWrapper>
        <Formik
        initialValues={{ dateRange: [] }}
        onSubmit={handleGenerate}
        >
            <StyledForm>
                <StyledDatePicker.RangePicker name='dateRange' />

                <StyledSubmitButton>Generate Report</StyledSubmitButton>

            </StyledForm>
        </Formik>
    </ReportWrapper>
  );
};
