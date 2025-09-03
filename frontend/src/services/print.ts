export const usePrint = () => {
  const printElement = (elementId: string, title = "Print") => {
    const printWindow = window.open("", "_blank", "width=800,height=600");
    if (!printWindow) return;

    const content = document.getElementById(elementId)?.innerHTML;

    printWindow.document.write(`
      <html>
        <head>
          <title>${title}</title>
          <style>
            @page { margin: 5mm; }
            body { font-family: Arial, sans-serif; }
            table { width: 100%; border-collapse: collapse; }
            th, td { padding: 4px; }
          </style>
        </head>
        <body>${content}</body>
      </html>
    `);

    printWindow.document.close();
    printWindow.focus();
    printWindow.print();
    printWindow.close();
  };

  return { printElement };
};
