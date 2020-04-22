import SolidAuth from "solid-auth-client";
import auth from "solid-auth-client";
import FC from "solid-file-client";

class MediaLoader {

    saveImage(url, file) {
        
        SolidAuth.fetch(url, {
            method: 'PUT',
            body: file,
            headers: {
                'Content-Type': 'image/png'
            }
        });
    }

    loadMedia(url, callback) { 
        const fc = new FC(auth);
        let content = fc.readFile( url );    
        content.then(value => callback(value));
    }

    

}

export default MediaLoader;