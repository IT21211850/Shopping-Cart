import jsPDF from "jspdf";
import "jspdf-autotable";
 

const generatePDF = (cart,subTotal,dilivaryCharges,total) => {
  const doc = new jsPDF();

  
  const tableColumn = ["Item ID",	"Item Name",	"Retail Price",	"wholesale Price" ,"Quantity","Total Price"];
  
  const tableRows = [];

  cart.forEach(element => {
    const cartData = [
      element.productId,
      element.productName,
      element.retailPrice,
      element.wholesalePrice,
      element.quantity,
      element.quantity > 8  ? element.quantity * element.wholesalePrice : element.quantity * element.retailPrice,
      ];
      
      tableRows.push(cartData);
      
    console.log(cartData)
  });


  
  doc.autoTable(tableColumn, tableRows, { startY: 20 });
  const date = Date().split(" ");
  // we use a date string to generate our filename.
  const dateStr = date[0] + date[1] + date[2] + date[3]+ date[4]+ date[5] ;
  // ticket title. and margin-top + margin-left
  doc.text("Payment details.", 14, 15);
  doc.text(`Sub Total : ${subTotal}`, 14, 150);
  doc.text(`Dilivary Charges : ${dilivaryCharges}`, 14, 160);
  doc.text(`Total : ${total}`, 14, 170);
  // we define the name of our PDF file.
  doc.save(`Payment_${dateStr}.pdf`);
};

export default generatePDF;