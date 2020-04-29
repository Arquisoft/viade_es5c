import data from '@solid/query-ldflex';
import solid from 'solid-auth-client';
import {AccessControlList} from '@inrupt/solid-react-components';
import {createDoc, createDocument, resourceExists} from './ldflex-helper';
import {errorToaster, permissionHelper, storageHelper} from '@utils';
import * as N3 from 'n3';

const appPath = "viade/";

const PREFIXES = {
    terms: 'https://www.w3.org/ns/solid/terms#',
    schema: 'http://www.w3.org/2000/01/rdf-schema#',
    things: 'https://schema.org/Thing#',
    ns: 'https://www.w3.org/1999/02/22-rdf-syntax-ns#',
    foaf: 'http://xmlns.com/foaf/0.1/',
    acl: 'http://www.w3.org/ns/auth/acl#',
    ldp: 'http://www.w3.org/ns/ldp#',
    xsd: 'http://www.w3.org/2001/XMLSchema#'
};

/**
 * Creates a valid string that represents the application path. This is the
 * default value if no storage predicate is discovered
 * @param webId
 * @param path
 * @returns {*}
 */
export const buildPathFromWebId = (webId, path) => {
    if (!webId) return false;
    const domain = new URL(typeof webId === 'object' ? webId.webId : webId).origin;
    return `${domain}/${path}`;
};

/**
 * Helper function to check for the user's pod storage value. If it doesn't exist, we assume root of the pod
 * @returns {Promise<string>}
 */
export const getAppStorage = async webId => {
    const podStoragePath = await data[webId].storage;

    let podStoragePathValue =
        podStoragePath && podStoragePath.value.trim().length > 0 ? podStoragePath.value : '';

    // Make sure that the path ends in a / so it is recognized as a folder path
    if (podStoragePathValue && !podStoragePathValue.endsWith('/')) {
        podStoragePathValue = `${podStoragePathValue}/`;

    }
    // If there is no storage value from the pod, use webId as the backup, and append the application path from env
    if (!podStoragePathValue || podStoragePathValue.trim().length === 0) {

        return buildPathFromWebId(webId, appPath);
    }

    return `${podStoragePathValue}${appPath}`;
};

/**
 *  Check and create the initial app files and folders
 * @param folderPath
 * @returns {Promise<boolean>} Returns whether or not there were any errors during the creation process
 */
export const createInitialFiles = async webId => {
    try {
        // First, check if we have WRITE permission for the app
        const hasWritePermission = await permissionHelper.checkSpecificAppPermission(
            webId,
            AccessControlList.MODES.WRITE
        );
        // If we do not have Write permission, there's nothing we can do here
        if (!hasWritePermission) return false;

        // Get the default app storage location from the user's pod and append our path to it
        const gameUrl = await storageHelper.getAppStorage(webId);


        // Set up various paths relative to the game URL
        const dataFilePath = `${gameUrl}data.ttl`;
        const settingsFilePath = `${gameUrl}settings.ttl`;

        // Check if the tictactoe folder exists, if not then create it. This is where game files, the game inbox, and settings files are created by default
        const gameFolderExists = await resourceExists(gameUrl);
        if (!gameFolderExists) {
            await createDoc(data, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'text/turtle'
                }
            });
        }
        const permisoWrit = await permissionHelper.checkWrittenPermissions(gameUrl, webId);
        if (!permisoWrit) return false;

        // Check if data file exists, if not then create it. This file holds links to other people's games
        const dataFileExists = await resourceExists(dataFilePath);
        if (!dataFileExists) {
            await createDocument(dataFilePath);
        }

        // Check if the settings file exists, if not then create it. This file is for general settings including the link to the game-specific inbox
        const settingsFileExists = await resourceExists(settingsFilePath);
        if (!settingsFileExists) {
            await createDocument(settingsFilePath);
        }

        return true;
    } catch (error) {
        errorToaster(error.message, 'Error');
        return false;
    }
};
export const inboxLinkSetting = async (path, inboxPath, fileName = 'settings.ttl') => {

    const termFactory = N3.DataFactory;
    const {namedNode} = termFactory;
    const writer = new N3.Writer({
        prefixes: {
            ldp: PREFIXES.ldp
        },
        format: 'text/turtle'
    });

    writer.addQuad(namedNode(''), namedNode('ldp:inbox'), namedNode(inboxPath));
    let resultPut = {ok: false};

    await writer.end(async (error, result) => {
        resultPut = await solid.fetch(ensureSlash(path, true) + fileName, {
            method: 'PUT',
            headers: {
                'Content-Type': 'text/turtle'
            },
            body: result
        });

        if (resultPut.status < 200 || resultPut.status >= 300) {
            //err
        }
    });

    return resultPut;

};

export const ensureSlash = (inputPath, needsSlash) => {
    const hasSlash = inputPath.endsWith('/');
    if (hasSlash && !needsSlash) {
        return inputPath.substr(0, inputPath.length - 1);
    }
    if (!hasSlash && needsSlash) {
        return `${inputPath}/`;
    }
    return inputPath;
};

export const checkAndInitializeInbox = async () => '';
