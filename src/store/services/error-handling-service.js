import router from "@/router";

function verifyErrorFromServer(e) {
    if (e.response.data.message) {
        switch (e.response.data.message) {
            case 'This action is unauthorized.':
                router.push({path: "/login"});
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