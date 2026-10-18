// src/utils/qrcode.ts
import QRCode from 'qrcode';
import JSZip from 'jszip';
import { saveAs } from 'file-saver';

/** Base URL of the deployed site (current origin at runtime). */
function getSiteOrigin(): string {
    return window.location.origin;
}

/** Build the verification URL for a user, including their name and serial number for scan-page display. */
export function getVerifyUrl(userId: string, fullName?: string, serialNumber?: number): string {
    const url = new URL(`/verify/${userId}`, getSiteOrigin());
    if (fullName) {
        url.searchParams.set('fullName', fullName);
    }
    if (serialNumber != null) {
        url.searchParams.set('sn', String(serialNumber));
    }
    return url.toString();
}

/**
 * Generate a QR-code as a data-URL (PNG) for a user's verification page.
 */
export async function generateQrDataUrl(userId: string, fullName?: string, serialNumber?: number): Promise<string> {
    const url = getVerifyUrl(userId, fullName, serialNumber);
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
export async function downloadQrAsPng(userId: string, filename: string, serialNumber?: number): Promise<void> {
    const dataUrl = await generateQrDataUrl(userId, filename, serialNumber);
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
    users: { id: string; fullName: string; serialNumber?: number }[],
    onProgress?: (done: number, total: number) => void,
): Promise<number> {
    const zip = new JSZip();
    const total = users.length;

    for (let i = 0; i < total; i++) {
        const user = users[i];
        const dataUrl = await generateQrDataUrl(user.id, user.fullName, user.serialNumber);
        // data URL → raw base64 string
        const base64 = dataUrl.split(',')[1];
        zip.file(`${sanitizeFilename(user.fullName)}-${sanitizeFilename(user.id)}.png`, base64, { base64: true });
        onProgress?.(i + 1, total);
    }

    const blob = await zip.generateAsync({ type: 'blob' });
    saveAs(blob, 'AEAA_QR_Codes.zip');
    return total;
}

/** Build the URL for the public event-schedule page. */
export function getScheduleUrl(): string {
    return new URL('/event-schedule', getSiteOrigin()).toString();
}

/**
 * Generate a QR-code as a data-URL (PNG) pointing to the event-schedule page.
 */
export async function generateScheduleQrDataUrl(): Promise<string> {
    const url = getScheduleUrl();
    return QRCode.toDataURL(url, {
        width: 512,
        margin: 2,
        color: { dark: '#005f38', light: '#ffffff' },
        errorCorrectionLevel: 'H',
    });
}

/**
 * Generate the event-schedule QR code and immediately trigger a PNG download.
 */
export async function downloadScheduleQrAsPng(): Promise<void> {
    const dataUrl = await generateScheduleQrDataUrl();
    const link = document.createElement('a');
    link.href = dataUrl;
    link.download = 'AEAA_Event_Schedule_QR.png';
    document.body.appendChild(link);
    link.click();
    link.remove();
}

/** Remove characters that are unsafe for file names. */
function sanitizeFilename(name: string): string {
    return name.replace(/[<>:"/\\|?*]+/g, '_').trim() || 'qrcode';
}
