import React, {useEffect} from 'react';
import {Route, Switch} from 'react-router-dom';
import {useTranslation} from 'react-i18next';
import {AccessControlList, withAuthorization} from '@inrupt/solid-react-components';
import {AuthNavBar, Footer} from '@components';
import {errorToaster, ldflexHelper, permissionHelper, storageHelper} from '@utils';
import styled from 'styled-components';
import auth from 'solid-auth-client';
import FC from 'solid-file-client';


const Container = styled.div`
  display: flex;
  flex-direction: column;
  position: relative;
  overflow-x: hidden;
  min-height: 100vh;
`;

const Content = styled.div`
  padding-top: 60px;
  flex: 1 0 auto;
  display: flex;
  overflow-y: auto;
  overflow-x: hidden;
`;

const PrivateLayout = ({routes, webId, location, history, ...rest}) => {
    const {t} = useTranslation();
    const errorMessages = {
        message: t('appPermission.message'),
        title: t('notifications.error'),
        label: t('appPermission.link.label'),
        href: t('appPermission.link.href')
    };
    const init = async () => {
        try {
            const path = await storageHelper.getAppStorage(webId);
            // Fetch the game's path in the pod, based on user's storage settings


            if (!await storageHelper.createInitialFiles(webId)) {
                console.log("No se puede hacer nada")
            } else {

                if (path) {
                    await permissionFilesInit(path);
                }

            }


        } catch (e) {
            /**
             * Check if something fails when we try to create a inbox
             * and show user a possible solution
             */
            if (e.name === "Inbox Error") {
                return errorToaster(e.message, "Error", {
                    label: t("errorCreateInbox.link.label"),
                    href: t("errorCreateInbox.link.href")
                });
            }

            errorToaster(e.message, "Error");
        }
    }
    useEffect(() => {
        if (webId) {
            permissionHelper.checkPermissions(webId, errorMessages).then(e => {
                if (e === true) {
                    init();
                } 
            });
        }
    }, [webId]);

    async function permissionFilesInit(path) {
        //Mirar si en el setting file existe

        const fc = new FC(auth);
        const settingsFile = `${path}settings.ttl`;
        let inboxPath = `${path}inbox/`;
        let hasInboxLinkSetting = false;
        //Se mira ahora si settings.ttl tiene un link con el inbox, y si lo tiene se guarda.
        const inboxLinkedPath = await ldflexHelper.getLinkedInbox(settingsFile);
        if (inboxLinkedPath) {
            inboxPath = inboxLinkedPath;
            hasInboxLinkSetting = true;
        }

        //Ahora se mira los permisos
        const permisosEscritura = await permissionHelper.checkSpecificAppPermission(
            webId,
            AccessControlList.MODES.WRITE
        );

        const rutas = `${path}routes/`;
        const comentarios = `${path}comments/`;
        const media = `${path}resources/`;
        const compartir = `${path}shared/`;
        if (permisosEscritura) {
            if (!await ldflexHelper.resourceExists(rutas)) {
                await fc.createFolder(rutas, {createPath: true});
            }

            if (!await ldflexHelper.resourceExists(comentarios)) {

                await fc.createFolder(comentarios, {createPath: true});
            }

            if (!await ldflexHelper.resourceExists(media)) {
                await fc.createFolder(media, {createPath: true});
            }

            if (!await ldflexHelper.resourceExists(compartir)) {
                await fc.createFolder(compartir, {createPath: true});
            }

            if (!await ldflexHelper.resourceExists(inboxPath)) {

                await fc.createFolder(inboxPath, {createPath: true});
            }
            // Check for CONTROL permissions to see if we can set permissions or not
            const hasControlPermissions = await permissionHelper.checkSpecificAppPermission(
                webId,
                AccessControlList.MODES.CONTROL
            );

            // If the user has Write and Control permissions, check the inbox settings
            if (hasControlPermissions) {
                // Check if the inbox permissions are set to APPEND for public, and if not fix the issue


                //Mirar con la carpeta rutas, media, etc... NO PUEDEN SER PÚBLICAS
                await permissionHelper.checkOrSetNoPermissions(rutas, webId);
                await permissionHelper.checkOrSetNoPermissions(comentarios, webId);
                await permissionHelper.checkOrSetNoPermissions(media, webId);
                await permissionHelper.checkOrSetNoPermissions(compartir, webId);
                await permissionHelper.checkOrSetNoPermissions(path, webId);

                await permissionHelper.checkOrSetInboxAppendPermissions(
                    inboxPath,
                    webId
                );
            }

            if (!hasInboxLinkSetting) {
                //Linked inbox into settings
                const path = await storageHelper.getAppStorage(webId);
                await storageHelper.inboxLinkSetting(path, inboxPath);
            }


        }
    }

    return (

        <React.Fragment>
            <Container>
                <Route
                    {...rest}
                    component={({history}) => (
                        <Content className="contentApp">
                            
                            <AuthNavBar {...{location, webId, history}} />
                            
                            <Switch>
                                {routes.map(route => {
                                    const {component: RouteComponent} = route;
                                    return (
                                        <Route
                                            key={route.id}
                                            path={route.path}
                                            render={routerProps => <RouteComponent {...routerProps} webId={webId}/>}
                                            webId={webId}
                                            exact
                                        />
                                    );
                                })}
                            </Switch>
                        </Content>
                    )}
                />
                <Footer/>
            </Container>
        </React.Fragment>
    );
};

export default withAuthorization(PrivateLayout);