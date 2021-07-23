import router from "@/router";

function verifyErrorFromServer(e) {
    if (e.response.data.message) {
        switch (e.response.data.message) {
            case 'Unauthenticated.':
            case 'This action is unauthorized.':
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

export default {
    verifyErrorFromServer
};