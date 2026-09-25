const {test, expect}= require('@playwright/test');
const ExcelJS = require('exceljs');
const workbook = new ExcelJS.Workbook();
// await workbook.xlsx.readFile("C:/Users/maira.khan/Downloads/ExceldownloadTest.xlsx").then(function)
async function writeExcelTest(searchText,replaceText,change,filePath) 
{
     
    await workbook.xlsx.readFile(filePath);
    const worksheet = workbook.getWorksheet('Sheet1');
    const output = await readExcel(worksheet,searchText)    
    const cell = worksheet.getCell(output.row, output.column+change.colChange)
    cell.value= replaceText
    await workbook.xlsx.writeFile(filePath)

}

async function readExcel(worksheet,searchText)
{
    let output ={row:-1, column:1}
    worksheet.eachRow((row, rowNumber)=>{
    row.eachCell((cell,colNumber)=>
    {
        if(cell.value===searchText)
        {
            output.row= rowNumber
            output.column =colNumber
        }
    }) 
})

    return output;
}
//writeExcelTest("Banana",550,{rowChange:0,colChange:2},"C:/Users/maira.khan/Downloads/ExcelDownloadTest.xlsx")

test("Upload Excel Document Validation", async({page})=>
    {
        const textSearch= "Mango";
        const updateValue= '620';
        await page.goto("https://rahulshettyacademy.com/upload-download-test/index.html");
        const downloadButton = page.waitForEvent("download");
        await page.locator("#downloadButton").click();
        const download = await downloadButton;
        await download.saveAs("C:/Users/maira.khan/Downloads/download.xlsx");
        writeExcelTest(textSearch,updateValue,{rowChange:0,colChange:2},"C:/Users/maira.khan/Downloads/download.xlsx")
        await page.locator("#fileinput").click();
        // set input file only work when the component has [type=file] without it it wont work 
        await page.locator("#fileinput").setInputFiles("C:/Users/maira.khan/Downloads/download.xlsx")
        const textLocator= page.getByText(textSearch)
        const desiredRow= await page.getByRole('row').filter({has:textLocator});
         await expect(desiredRow.locator("#cell-4-undefined")).toContainText(updateValue);


    })
