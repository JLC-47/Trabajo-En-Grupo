import {getShows} from "../service/service.js";
import {renderPosts} from "../ui/ui.js"

async function init() {
        const shows = await getShows();
        renderPosts(shows);

}

init();

