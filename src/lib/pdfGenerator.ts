import { jsPDF } from 'jspdf';
import 'jspdf-autotable';

export const generateImpactReportPDF = (report: {
  title: string;
  date: string;
  tag: string;
  desc: string;
  content: string;
  author?: string;
}) => {
  const doc = new jsPDF();
  const pageWidth = doc.internal.pageSize.getWidth();

  // Header Background
  doc.setFillColor(15, 23, 42); // Navy Primary
  doc.rect(0, 0, pageWidth, 40, 'F');

  // Logo / Title
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text('ALPHA OMEGA TRUST', 20, 25);
  
  doc.setTextColor(253, 186, 116); // Secondary Orange
  doc.setFontSize(10);
  doc.text('IMPACT DISPATCH LOG', 20, 32);

  // Report Info Section
  doc.setTextColor(15, 23, 42);
  doc.setFontSize(28);
  doc.text(report.title.toUpperCase(), 20, 60);

  doc.setFontSize(12);
  doc.setTextColor(100, 100, 100);
  doc.text(`DATE: ${report.date}`, 20, 70);
  doc.text(`TAG: ${report.tag.toUpperCase()}`, 20, 76);

  // Horizontal Line
  doc.setDrawColor(220, 220, 220);
  doc.line(20, 85, pageWidth - 20, 85);

  // Brief
  doc.setFontSize(14);
  doc.setTextColor(50, 50, 50);
  const briefText = doc.splitTextToSize(report.desc, pageWidth - 40);
  doc.text(briefText, 20, 100);

  // Main Content
  doc.setFontSize(11);
  doc.setTextColor(80, 80, 80);
  const mainContent = doc.splitTextToSize(report.content, pageWidth - 40);
  doc.text(mainContent, 20, 120);

  // Footer
  const footerY = doc.internal.pageSize.getHeight() - 20;
  doc.setDrawColor(240, 240, 240);
  doc.line(20, footerY - 5, pageWidth - 20, footerY - 5);
  
  doc.setFontSize(8);
  doc.setTextColor(150, 150, 150);
  doc.text('AUTHENTICATED MISSION RECORD - ALPHA OMEGA INTER CHURCH TRUST', 20, footerY);
  doc.text(`VERIFIED BY: ${report.author || 'SYSTEM'}`, pageWidth - 20, footerY, { align: 'right' });

  // Save the PDF
  const filename = `${report.title.toLowerCase().replace(/\s+/g, '_')}_impact_report.pdf`;
  doc.save(filename);
};
