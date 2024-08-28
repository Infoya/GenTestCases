import { jsPDF } from "jspdf";
import html2canvas from 'html2canvas';

export const handleDownloadHistory = (messages: any, chatName: string) => {
  // Define the filename for the text file
  const fileName = `${chatName}-history.txt`;

  // Helper function to wrap text at a specific line length
  const wrapText = (text: string, maxLineLength: number) => {
    const lines = [];
    let currentLine = '';

    text.split(' ').forEach(word => {
      if (currentLine.length + word.length + 1 > maxLineLength) {
        lines.push(currentLine);
        currentLine = word;
      } else {
        currentLine += (currentLine.length ? ' ' : '') + word;
      }
    });

    lines.push(currentLine); // Add the last line
    return lines.join('\n');
  };

  // Convert messages object to a formatted text string with wrapping
  const textContent = messages.map((message: any, index: number) => {
    const sender = message.sender === "user" ? "User" : "Bot";
    const wrappedText = wrapText(message.text, 80); // Wrap lines at 80 characters
    return `Message ${index + 1}:\nSender: ${sender}\nContent:\n${wrappedText}\n\n`;
  }).join("\n");

  // Create a new Blob object using the text string
  const blob = new Blob([textContent], { type: "text/plain" });

  // Create a temporary URL for the Blob
  const href = URL.createObjectURL(blob);

  // Create a temporary anchor element
  const link = document.createElement("a");
  link.href = href; // Set the href to the Blob URL
  link.download = fileName; // Set the download attribute with the filename
  document.body.appendChild(link); // Append the anchor to the body
  link.click(); // Programmatically click the anchor to trigger the download

  // Clean up by removing the anchor and revoking the Blob URL
  document.body.removeChild(link);
  URL.revokeObjectURL(href);
};

export const handleDownloadPDF = async () => {
  const input = document.getElementById('capture');

  if (input) {
    // Create a canvas from the input element
    const canvas = await html2canvas(input, { scale: 2 }); // Increase scale for higher resolution

    // Get the image data from the canvas
    const imgData = canvas.toDataURL("image/png");

    // Create a new jsPDF instance
    const pdf = new jsPDF("p", "mm", "a4");

    // Calculate image width and height to maintain aspect ratio
    const imgWidth = 210;
    const pageHeight = 297;
    const imgHeight = (canvas.height * imgWidth) / canvas.width;
    let heightLeft = imgHeight;

    let position = 0;

    // Add the first image to the PDF
    pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
    heightLeft -= pageHeight;

    // Add more pages if content exceeds one page
    while (heightLeft >= 0) {
      position = heightLeft - imgHeight;
      pdf.addPage();
      pdf.addImage(imgData, "PNG", 0, position, imgWidth, imgHeight);
      heightLeft -= pageHeight;
    }

    // Save the PDF
    pdf.save("chat_history.pdf");
  }
};
