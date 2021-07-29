import router from "@/router";
import i18n from '@/i18n.js'

function verifyErrorFromServer(e) {
    if (e.response.data.message) {
        switch (e.response.data.message) {
            case 'Unauthenticated.':
            // case 'This action is unauthorized.':
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
        }
    }
    throw e;
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
    displayAlertFromServer
};