// src/utils/qrcode.ts
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/** Base URL of the deployed site (current origin at runtime). */
function getSiteOrigin(): string {
    return window.location.origin;
}

/** Build the verification URL for a given user ID. */
export function getVerifyUrl(userId: string): string {
    return `${getSiteOrigin()}/verify/${userId}`;
}

/**
 * Generate a QR-code as a data-URL (PNG) for a user's verification page.
 */
export async function generateQrDataUrl(userId: string): Promise<string> {
    const url = getVerifyUrl(userId);
    return QRCode.toDataURL(url, {
        width: 512,
        margin: 2,
        color: { dark: '#005f38', light: '#ffffff' },
        errorCorrectionLevel: 'H',
    });
}

/**
 * Generate a QR code and immediately trigger a PNG download.
 */
export async function downloadQrAsPng(userId: string, filename: string): Promise<void> {
    const dataUrl = await generateQrDataUrl(userId);
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = `${sanitizeFilename(filename)}.png`;
    document.body.appendChild(link);
    link.click();
    link.remove();
}

/**
 * Generate QR codes for multiple users and download as a ZIP archive.
 * Each file is named `{fullName}.png`.
 * Returns the number of QR codes generated.
 */
export async function downloadAllQrAsZip(
    users: { id: string; fullName: string }[],
    onProgress?: (done: number, total: number) => void,
): Promise<number> {
    const zip = new JSZip();
    const total = users.length;

    for (let i = 0; i < total; i++) {
        const user = users[i];
        const dataUrl = await generateQrDataUrl(user.id);
        // data URL → raw base64 string
        const base64 = dataUrl.split(',')[1];
        zip.file(`${sanitizeFilename(user.fullName)}.png`, base64, { base64: true });
        onProgress?.(i + 1, total);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'AEAA_QR_Codes.zip');
    return total;
}

/** Remove characters that are unsafe for file names. */
function sanitizeFilename(name: string): string {
    return name.replace(/[<>:"/\\|?*]+/g, '_').trim() || 'qrcode';
}
