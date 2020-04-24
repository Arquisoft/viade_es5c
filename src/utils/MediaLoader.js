import SolidAuth from "solid-auth-client";
import auth from "solid-auth-client";
import FC from "solid-file-client";

class MediaLoader {

    saveImage(url, file,content_type) {

        SolidAuth.fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': content_type
            }
        });
    }

    loadMedia(url, callback) {
        const fc = new FC(auth);
        let content = fc.readFile(url);
        content.then(value => callback(value));
    }


}

export default MediaLoader;