using System;
using System.Collections.Generic;
using System.Linq;
using System.Text;
using System.Threading.Tasks;
using iTextSharp.text;
using iTextSharp.text.pdf;

namespace SuppliesDotCom.PDFHelper
{

    public class PdfPageEvents : IPdfPageEvent
    {
        #region members
        private BaseFont _baseFont = null;
        private PdfContentByte _content;
        #endregion

        #region IPdfPageEvent Members
        public void OnOpenDocument(PdfWriter writer, Document document)
        {
            _baseFont = BaseFont.CreateFont(BaseFont.HELVETICA,
                             BaseFont.CP1252, BaseFont.NOT_EMBEDDED);
            _content = writer.DirectContent;
        }

        public void OnStartPage(PdfWriter writer, Document document)
        { }

        public void OnEndPage(PdfWriter writer, Document document)
        {
            // Write header text
            string headerText = "";
            _content.BeginText();
            _content.SetFontAndSize(_baseFont, 8);
            _content.SetTextMatrix(GetCenterTextPosition(headerText,
                                   writer), writer.PageSize.Height - 10);
            _content.ShowText(headerText);
            _content.EndText();

            // Write footer text (page numbers)
            string text = "Page " + writer.PageNumber;
            _content.BeginText();
            _content.SetFontAndSize(_baseFont, 8);
            _content.SetTextMatrix(GetCenterTextPosition(text, writer), 10);
            _content.ShowText(text);
            _content.EndText();
        }

        public void OnCloseDocument(PdfWriter writer, Document document)
        { }

        public void OnParagraph(PdfWriter writer,
                    Document document, float paragraphPosition)
        { }

        public void OnParagraphEnd(PdfWriter writer,
                    Document document, float paragraphPosition)
        { }

        public void OnChapter(PdfWriter writer, Document document,
                              float paragraphPosition, Paragraph title)
        { }

        public void OnChapterEnd(PdfWriter writer,
                    Document document, float paragraphPosition)
        { }

        public void OnSection(PdfWriter writer, Document document,
                    float paragraphPosition, int depth, Paragraph title)
        { }

        public void OnSectionEnd(PdfWriter writer,
                    Document document, float paragraphPosition)
        { }

        public void OnGenericTag(PdfWriter writer, Document document,
                                 Rectangle rect, string text)
        { }
        #endregion

        private float GetCenterTextPosition(string text, PdfWriter writer)
        {
            return writer.PageSize.Width / 2 - _baseFont.GetWidthPoint(text, 8) / 2;
        }
    }
}
