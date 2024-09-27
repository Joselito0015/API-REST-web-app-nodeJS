const cloudinary = require('cloudinary').v2;
const { PDFDocument, rgb } = require('pdf-lib');
const fs = require('fs').promises;
//libreria para obetner fecha y hora

cloudinary.config({
    cloud_name: 'dmbtlv0hg',
    api_key: '381815326731569',
    api_secret: 'yBoghdZkYzBETXFy5Dlt9VgWnP8',
  });
  
const inch = 72.0
const cm = inch / 2.54

const FACTOR = 1.007*cm
const _W = 21*cm
const _H = 29.7*cm


async function llenarYMarcarPDF(info) {
    // Lee el PDF que deseas llenar y marcar
    const pdfBytes = await fs.readFile('./src/utils/Haug.pdf'); // Reemplaza 'plantilla.pdf' con el nombre de tu PDF
    // Carga el PDF en un objeto PDFDocument
    const pdfDoc = await PDFDocument.load(pdfBytes);

    // Agrega una nueva página al PDF si es necesario
    const pages = pdfDoc.getPages();

    // Coloca texto en posiciones específicas en la primera página
    const drawText1 = (x, y, text) => {
        pages[0].drawText(text, {
            x,
            y,
            size: 12,
            color: rgb(0, 0, 0),
        });
    };
    
    const drawText2 = (x, y, text) => {
        pages[1].drawText(text, {
            x,
            y,
            size: 12,
            color: rgb(0, 0, 0),
        });
    };

    //---------------------------HEADER 1---------------------------------
    drawText1(78, 731, `${info.Nombre}`);
    drawText1(110, 709, `${info.Contrata}`);
    drawText1(295, 709, `${info.DNI}`);
    drawText1(465, 709, `${info.Cargo}`);

    drawText1(295, 695, `${info.Fecha}`);
    drawText1(465, 695, `${info.Hora}`);

    //--------------------------- PAGINA 1---------------------------------
    drawText1(65,672, `${info.ActosSubestandares.Marked ? "X" : " "}`); //Actos Subestandares
    drawText1(78, 636, `${info.ActosSubestandares.CheckA ? "X" : " "}`); //Acto 1
    drawText1(78, 608, `${info.ActosSubestandares.CheckB ? "X" : " "}`); //Acto 2
    drawText1(78, 580, `${info.ActosSubestandares.CheckC ? "X" : " "}`); //Acto 3
    drawText1(78, 552, `${info.ActosSubestandares.CheckD ? "X" : " "}`); //Acto 4
    drawText1(78, 524, `${info.ActosSubestandares.CheckE ? "X" : " "}`); //Acto 5
    drawText1(78, 492, `${info.ActosSubestandares.CheckF ? "X" : " "}`); //Acto 6
    drawText1(78, 466, `${info.ActosSubestandares.CheckG ? "X" : " "}`); //Acto 7
    drawText1(78, 438, `${info.ActosSubestandares.CheckH ? "X" : " "}`); //Acto 8
    drawText1(78, 410, `${info.ActosSubestandares.CheckI ? "X" : " "}`); //Acto 9
    drawText1(78, 382, `${info.ActosSubestandares.Otros ? "X" : " "}`); //Otros
    drawText1(150, 382, `${info.ActosSubestandares.OtrosTexto}`); //Otros Texto
    drawText1(78, 300, `${info.DetalleActo}`); //DetalleActo

    //--------------------------- PAGINA 2---------------------------------
    drawText2(75, 797, `${info.CondicionesSubestandares.Marked ? "X" : " "}`);
    drawText2(85, 763, `${info.CondicionesSubestandares.Check1 ? "X" : " "}`);
    drawText2(85, 734, `${info.CondicionesSubestandares.Check2 ? "X" : " "}`);
    drawText2(85, 705, `${info.CondicionesSubestandares.Check3 ? "X" : " "}`);
    drawText2(85, 676, `${info.CondicionesSubestandares.Check4 ? "X" : " "}`);
    drawText2(85, 647, `${info.CondicionesSubestandares.Check5 ? "X" : " "}`);
    drawText2(85, 618, `${info.CondicionesSubestandares.Check6 ? "X" : " "}`);
    drawText2(85, 589, `${info.CondicionesSubestandares.Otros ? "X" : " "}`);
    drawText2(150, 589, `${info.CondicionesSubestandares.OtrosTexto }`);

    drawText2(50, 520, `${info.DetalleCondicion}`);
    drawText2(50, 390, `${info.Correción}`);
    drawText2(150, 260, `${info.CheckList.Check1 ? "X" : " "}`);
    drawText2(310, 262, `${info.CheckList.Check2 ? "X" : " "}`);
    drawText2(470, 263, `${info.CheckList.Check3 ? "X" : " "}`);

    drawText2(150, 202, `${info.Observador}`);

    //--------------------------- Final de documento ---------------------------------


    // Guarda el PDF llenado y marcado
    const pdfBytesLlenado = await pdfDoc.save();

    // Guarda el PDF llenado en un nuevo archivo
    // await fs.writeFile('./src/utils/formulario_lleno.pdf', pdfBytesLlenado);
    return pdfBytesLlenado;
}

module.exports = llenarYMarcarPDF;