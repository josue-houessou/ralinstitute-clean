const url = 'C:\Users\DELL\Desktop\rali\assets\pad1.pdf';
        const pdfViewer = document.getElementById('pdfViewer');
        pdfjsLib.getDocument(url).promise.then(pdf => {
            pdf.getPage(1).then(page => {
                const canvas = document.createElement('canvas');
                const context = canvas.getContext('2d');
                const viewport = page.getViewport({ scale: 1 });
                canvas.height = viewport.height;
                canvas.width = viewport.width;
                page.render({ canvasContext: context, viewport: viewport });
                pdfViewer.appendChild(canvas);
            });
        });