import router from "@/router";
import i18n from '@/i18n.js'

function verifyErrorFromServer(e) {
    console.log(e);
    if (e.response.data.message) {
        switch (e.response.data.message) {
            case 'Unauthenticated.':
                router.push({path: "/login"});
                return;
            case 'user email not verified.':
                router.push({path: "/login"});
                return;
            case 'user profile is not filled.':
                router.push({path: "/first-time-profile"});
                return;
            case 'Please select a correct role':
                router.push({path: "/select-role"});
                return;
            // case 'This action is unauthorized.':
            //     router.go(-1);
            //     return;
        }
    }
    throw e;
}

function checkIfActionAuthorized(e) {
    if (e.response.data) {
        if (e.response.data.message) {
            if (e.response.data.message == "This action is unauthorized.") {
                return false;
            }
        }
    }
    return true;
}

function displayAlertFromServer(e) {
    if (e.response.data) {
        if (e.response.data.message) {
            switch (e.response.data.message) {
                case "The given data was invalid.":
                    return i18n.t('alert.givenDataIsInvalid');
                case "This action is unauthorized.":
                    return i18n.t('alert.actionIsUnauthorized');
            }
        }
    }
    return "Oops! Something wrong..."
}

export default {
    verifyErrorFromServer,
    checkIfActionAuthorized,
    displayAlertFromServer
};