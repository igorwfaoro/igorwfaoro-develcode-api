export abstract class UrlHelper {

    // replace \ with /
    // add http:// if not present
    public static normalize(url: string): string {
        
        if (!url.startsWith('http')) {
            url = `http://${url}`;
        }

        return url.replace(/\\/g, '/');
    }
}