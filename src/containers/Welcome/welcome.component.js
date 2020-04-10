import React, { useEffect } from 'react';
import {Uploader,AccessControlList} from '@inrupt/solid-react-components';
import {Trans, useTranslation} from 'react-i18next';
import {
  ImageWrapper,
  WelcomeCard,
  WelcomeDetail,
  WelcomeLogo,
  WelcomeName,
  WelcomeProfile,
  WelcomeWrapper
} from './welcome.style';
import {ImageProfile} from '@components';
import {errorToaster,ldflexHelper,permissionHelper,storageHelper} from '@utils';
import data from "@solid/query-ldflex";
import auth from 'solid-auth-client';
import FC from 'solid-file-client';
const fc = new FC(auth);

/**
 * Welcome Page UI component, containing the styled components for the Welcome Page
 * Image component will get theimage context and resolve the value to render.
 * @param props
 */
export const WelcomePageContent = props => {
  const { webId, image, updatePhoto, name } = props;
  const { t } = useTranslation();
  const limit = 2100000;

  useEffect(() => {
    if (webId) init(webId);
  }, [webId]);
  const init = async document => {
    try {
      const path = await storageHelper.getAppStorage(webId);
      // Fetch the game's path in the pod, based on user's storage settings
      
      await storageHelper.createInitialFiles(webId);
      
      
      if (path) {
        await permissionFilesInit(path);
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
  };


  async function permissionFilesInit(path){
    //Mirar si en el setting file existe
    const settingsFile=`${path}settings.ttl`;
    let inboxPath=`${path}inbox/`;
    let hasInboxLinkSetting=false;
    //Se mira ahora si settings.ttl tiene un link con el inbox, y si lo tiene se guarda.
    const inboxLinkedPath = await ldflexHelper.getLinkedInbox(settingsFile);
    if (inboxLinkedPath) {
      inboxPath = inboxLinkedPath;
      hasInboxLinkSetting = true;
    }
    
    //Ahora se mira los permisos
    const permisosEscritura=await permissionHelper.checkSpecificAppPermission(
      webId,
      AccessControlList.MODES.WRITE
    );
    
    const rutas=`${path}rutass/`;
    if (permisosEscritura) {
      if (!ldflexHelper.resourceExists(rutas)){
        await fc.createFolder(rutas,{createPath:true});
      }
      if(!ldflexHelper.resourceExists(inboxPath)){
        
        await fc.createFolder(inboxPath, {createPath:true});

        // Check for CONTROL permissions to see if we can set permissions or not
        const hasControlPermissions = await permissionHelper.checkSpecificAppPermission(
          webId,
          AccessControlList.MODES.CONTROL
        );
        
        // If the user has Write and Control permissions, check the inbox settings
        if (hasControlPermissions) {
          // Check if the inbox permissions are set to APPEND for public, and if not fix the issue
          await permissionHelper.checkOrSetInboxAppendPermissions(
            inboxPath,
            webId
          );
        }

        if (!hasInboxLinkSetting) {
          //Linked inbox into settings
          const path = await storageHelper.getAppStorage(webId);
          await storageHelper.inboxLinkSetting(path,inboxPath);
        }
      }
    }
  }
  return (
    <WelcomeWrapper data-testid="welcome-wrapper">
      <WelcomeCard className="card">
        <WelcomeLogo data-testid="welcome-logo">
          <img src="img/logo/logo.png" alt="logo" />
        </WelcomeLogo>
        <WelcomeProfile data-testid="welcome-profile">
          <h3>
            {t('welcome.welcome')}, <WelcomeName>{name}</WelcomeName>
          </h3>
          <ImageWrapper>
            <Uploader
              {...{
                fileBase: webId && webId.split('/card')[0],
                limitFiles: 1,
                limitSize: limit,
                accept: 'jpg,jpeg,png',
                errorsText: {
                  sizeLimit: t('welcome.errors.sizeLimit', {
                    limit: `${limit / 1000000}Mbs`
                  }),
                  unsupported: t('welcome.errors.unsupported'),
                  maximumFiles: t('welcome.errors.maximumFiles')
                },
                onError: error => {
                  if (error && error.statusText) {
                    errorToaster(error.statusText, t('welcome.errorTitle'));
                  }
                },
                onComplete: uploadedFiles => {
                  updatePhoto(
                    uploadedFiles[uploadedFiles.length - 1].uri,
                    t('welcome.uploadSuccess'),
                    t('welcome.successTitle')
                  );
                },
                render: props => (
                  <ImageProfile
                    {...{
                      ...props,
                      webId,
                      photo: image,
                      text: t('welcome.upload'),
                      uploadingText: t('welcome.uploadingText')
                    }}
                  />
                )
              }}
            />
          </ImageWrapper>
        </WelcomeProfile>
      </WelcomeCard>
      <WelcomeCard className="card">
        <WelcomeDetail data-testid="welcome-detail">
          <Trans i18nKey="welcome.title">
            <h3>
              title
              <a
                href="https://github.com/inrupt/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link
              </a>
            </h3>
          </Trans>
          <Trans i18nKey="welcome.description">
            <p>
              text
              <a
                href="https://github.com/inrupt/solid-react-sdk"
                target="_blank"
                rel="noopener noreferrer"
              >
                link{' '}
              </a>{' '}
              text
            </p>
          </Trans>
          <p>{t('welcome.integrantesEquipo')}</p>
          <li>
            {t('welcome.integrante1')}
          </li>
          <li>
            {t('welcome.integrante2')}
          </li>
          <li>
            {t('welcome.integrante3')}
          </li>
          <li>
            {t('welcome.integrante4')}
          </li>
          <li>
            {t('welcome.integrante5')}
          </li>
          <li>
           {t('welcome.integrante6')}
          </li>

        <p>{t('welcome.informacionEquipo')}</p>

        </WelcomeDetail>
      </WelcomeCard>
    </WelcomeWrapper>
  );
};
