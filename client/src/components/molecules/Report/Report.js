import React, { useContext } from 'react';
import { AppContext } from '../../../context/app-context';
import { Notification } from '../../atoms';
import {
  StyledForm,
  StyledDatePicker,
  StyledSubmitButton,
  ReportWrapper,
  FiltersWrapper,
} from './Report.styles';
// import { clothingSizeOptions, shoeSizeOptions } from '../../../utils/constants';
import { downloadWorkbook, formatDate } from '../../../utils/helpers';
import { Formik } from 'formik';
import { getReportData } from '../../../services/statistics';
import { StyledSelect } from '../../atoms/Select';
import { AccountContext } from '../../../context/account-context';
const ExcelJS = require('exceljs');

export const Report = () => {
  const { token } = useContext(AppContext);
  const { allTags, allUsers } = useContext(AccountContext);

  // Filter out only donor users
  const donorUsers = allUsers
    ? Object.values(allUsers).filter((user) => user.type === 'donor')
    : [];

  // Map over donorUsers to create a new array for the options prop
  const userOptions = donorUsers.map((user) => ({
    value: user._id,
    label: user.name,
  }));
  // Map over allTags to create a new array for the options prop
  const tagOptions = allTags.map((tag) => ({
    value: tag.name,
    label: tag.name,
  }));
  var res = {};

  const handleGenerate = async (values, { resetForm }) => {
    // disabling the ability to generate a full-report (without date-range) for now
    if (values.dateRange.length === 0) {
      Notification('Error', 'Please select a date range', 'error');
      return false;
    }

    if (values.dateRange) {
      // create filters object which has the dateRange, donor and tag
      const filters = {
        from: values.dateRange ? values.dateRange[0] : '',
        to: values.dateRange ? values.dateRange[1] : '',
        donor: values.donor ? values.donor : '',
        tag: values.tag ? values.tag : '',
      };
      res = await getReportData(filters, token);
    }

    if (res.success) {
      //set up excel parameters
      const workbook = new ExcelJS.Workbook();
      workbook.creator = 'Give Your Best UK';
      workbook.name =
        values.dateRange && values.dateRange.length
          ? 'Give Your Best Webshop Report ' +
            formatDate(values.dateRange[0]) +
            ' to ' +
            formatDate(values.dateRange[1])
          : 'Give Your Best Webshop Report';

      // Add sheets
      const sheet = workbook.addWorksheet('General');
      const sheetTwo = workbook.addWorksheet('Category');
      const sheetThree = workbook.addWorksheet('Size');
      const sheetFour = workbook.addWorksheet('Tag');

      // general worksheet
      sheet.columns = [
        { key: 'name', width: 50 },
        { key: 'value', width: 20 },
      ];

      // sheet one headings and styles

      sheet.getCell('A1').value = {
        richText: [
          {
            font: { bold: true, name: 'Calibri', scheme: 'minor' },
            text: 'Give Your Best Webshop Report',
          },
        ],
      };

      if (values.dateRange && values.dateRange.length) {
        sheet.getCell('A2').value = {
          richText: [
            {
              font: { bold: true, name: 'Calibri', scheme: 'minor' },
              text:
                formatDate(values.dateRange[0]) +
                ' to ' +
                formatDate(values.dateRange[1]),
            },
          ],
        };
      }

      sheet.getCell('A3').value = {
        richText: [{ font: { bold: true }, text: '' }],
      };

      //define columns and heading styles for each group by sheet
      const sheets = [sheetTwo, sheetThree, sheetFour];

      sheets.forEach((s) => {
        s.columns = [
          { header: s.name, key: s.name.toLowerCase(), width: 30 },
          { header: 'Number of items uploaded', key: 'uploaded', width: 27 },
          { header: 'Number of items shopped', key: 'shopped', width: 27 },
          { header: 'Number of unique shoppers', key: 'unique', width: 27 },
          {
            header:
              !values.dateRange || !values.dateRange.length
                ? 'Number of items available'
                : '',
            key: 'available',
            width: 27,
          },
        ];

        s.getCell('A1').font = {
          name: 'Calibri',
          bold: true,
        };
        s.getCell('B1').font = {
          name: 'Calibri',
          bold: true,
        };
        s.getCell('C1').font = {
          name: 'Calibri',
          bold: true,
        };
        s.getCell('D1').font = {
          name: 'Calibri',
          bold: true,
        };
        s.getCell('E1').font = {
          name: 'Calibri',
          bold: true,
        };
      });

      // sheet one rows

      sheet.addRow({
        name: 'Number of Shoppers signed-up',
        value: res.data.shopperCount || 0,
      });
      sheet.addRow({
        name: 'Number of Shoppers signed-up plus additional shoppers',
        value: res.data.shopperCountWithAdditional || 0,
      });
      sheet.addRow({
        name: 'Number of shoppers who have shopped',
        value: res.data.shoppersWhoShoppedCount || 0,
      });
      sheet.addRow({
        name: 'Number of Shoppers who signed-up and shopped',
        value: res.data.shoppersWhoShoppedAndSignedUpCount || 0,
      });

      sheet.addRow({ name: '', value: '' });

      sheet.addRow({
        name: 'Number of Donors',
        value: res.data.donorCount || 0,
      });
      sheet.addRow({
        name: 'Number of converted Donors',
        value: res.data.donorConvertedCount || 0,
      });

      sheet.addRow({ name: '', value: '' });

      sheet.addRow({
        name: 'Number of Items uploaded',
        value: res.data.itemsCount || 0,
      });
      sheet.addRow({
        name: 'Number of Items shopped',
        value: res.data.itemsShopped || 0,
      });

      // category worksheet rows

      res.data.category.forEach((c) => {
        sheetTwo.addRow({
          category: c._id,
          uploaded: c.total || 0,
          shopped: c.shopped || 0,
          unique:
            c.shopperUnique.filter((obj) => obj.shopperFirstName !== '')
              .length || 0,
          available: c.available || 0,
        });
      });

      sheetTwo.addRow({
        category: '',
        uploaded: '',
        shopped: '',
        available: '',
        unqiue: '',
      });
      sheetTwo.addRow({
        category: '',
        uploaded: '',
        shopped: '',
        available: '',
        unique: '',
      });

      res.data.subCategory.forEach((c) => {
        sheetTwo.addRow({
          category: c._id,
          uploaded: c.total || 0,
          shopped: c.shopped || 0,
          unique:
            c.shopperUnique.filter((obj) => obj.shopperFirstName !== '')
              .length || 0,
          available: c.available || 0,
        });
      });

      // size worksheet rows

      res.data.clothingSize.forEach((c) => {
        sheetThree.addRow({
          size: c._id,
          uploaded: c.total || 0,
          shopped: c.shopped || 0,
          unique:
            c.shopperUnique.filter((obj) => obj.shopperFirstName !== '')
              .length || 0,
          available: c.available || 0,
        });
      });

      sheetThree.addRow({ size: '', uploaded: '', shopped: '', available: '' });
      sheetThree.addRow({ size: '', uploaded: '', shopped: '', available: '' });

      res.data.shoeSize.forEach((c) => {
        sheetThree.addRow({
          size: c._id,
          uploaded: c.total || 0,
          shopped: c.shopped || 0,
          unique:
            c.shopperUnique.filter((obj) => obj.shopperFirstName !== '')
              .length || 0,
          available: c.available || 0,
        });
      });

      // tags worksheet rows

      res.data.tags.forEach((c) => {
        //deleted tags sometimes return item data
        sheetFour.addRow({
          tag: c._id,
          uploaded: c.total || 0,
          shopped: c.shopped || 0,
          unique:
            c.shopperUnique.filter((obj) => obj.shopperFirstName !== '')
              .length || 0,
          available: c.available || 0,
        });
      });

      //create link and download excel
      downloadWorkbook(workbook);
      resetForm();
    } else {
      Notification('Error', res.message, 'error');
    }
    return true;
  };

  return (
    <ReportWrapper>
      <Formik
        initialValues={{ dateRange: [], tag: '', donor: '' }}
        onSubmit={handleGenerate}
      >
        <StyledForm>
          <FiltersWrapper>
            <StyledDatePicker.RangePicker name="dateRange" />
            <StyledSelect reportStyle name="tag" options={tagOptions} />
            <StyledSelect reportStyle name="donor" options={userOptions} />
          </FiltersWrapper>
          <StyledSubmitButton>Generate Report</StyledSubmitButton>
        </StyledForm>
      </Formik>
    </ReportWrapper>
  );
};
