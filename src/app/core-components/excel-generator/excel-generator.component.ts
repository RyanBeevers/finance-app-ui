import { Component, OnInit } from '@angular/core';
// import * as ExcelJS from 'exceljs';

@Component({
  selector: 'app-excel-generator',
  templateUrl: './excel-generator.component.html',
  styleUrl: './excel-generator.component.scss'
})
export class ExcelGeneratorComponent implements OnInit {

  
  constructor() { }

  ngOnInit(): void {
    this.updateExcelTemplate();
  }
  
  updateExcelTemplate(): void {
    // const templateFilePath = '../../../assets/finances.xlsx';

    // // Update the Excel template (let's say we want to update a specific cell)
    // this.updateExcelTemplateFunction(templateFilePath, 'New Value', 2, 1)
    //   .then(() => {
    //     console.log('Template updated successfully');
    //   })
    //   .catch(error => {
    //     console.error('Error updating template:', error);
    //   });
  }

  // private updateExcelTemplateFunction(templateFilePath: string, newValue: any, rowIndex: number, columnNumber: number): Promise<void> {
  //   const workbook = new ExcelJS.Workbook();

  //   return workbook.xlsx.readFile(templateFilePath)
  //     .then(() => {
  //       // Get the first worksheet in the workbook
  //       const worksheet = workbook.getWorksheet(1);

  //       // Check if the worksheet exists
  //       if (worksheet) {
  //         // Assuming the data starts from the second row (skip header)
  //         //@ts-ignore
  //         const cell = worksheet.getCell(rowIndex + 2, worksheet.getColumn(columnNumber));

  //         // Update the cell value
  //         cell.value = newValue;

  //         // Save the workbook
  //         return workbook.xlsx.writeFile('updated_template.xlsx');
  //       } else {
  //         throw new Error('Worksheet not found in the template.');
  //       }
  //     });
  // }

}
