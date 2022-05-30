let jobList = document.getElementsByClassName('job-item');
const filterBody = document.querySelector('.filter');
const job = document.querySelector('.job');

fetch('./data.json')
    .then(response => response.json())
    .then(data => {
    for (var i = 0; i < data.length; i++) {
        //create li.job-list
        const jobList = document.createElement("li");
        jobList.innerText = '';
        jobList.classList.add("job-item");
        job.appendChild(jobList);
        //For layout purpose
        const left_part = document.createElement("div");
        left_part.classList.add("left-part");
        jobList.appendChild(left_part)
        //create div.comp-logo
        const compLogo = document.createElement("div")
        compLogo.classList.add('logo');
        left_part.appendChild(compLogo);

        //creat img#comp-logo
        imgCompLogo = document.createElement('img');
        imgCompLogo.classList.add('img-logo');
        imgCompLogo.setAttribute('alt', data[i].id)
        compLogo.appendChild(imgCompLogo);
        imgCompLogo.setAttribute('src', data[i].logo)

        //create and append div.job-details
        const jobDetails = document.createElement('div')
        jobDetails.classList.add('job-details');
        left_part.appendChild(jobDetails)

        //create div.upline
        const upLine = document.createElement('div')
        upLine.classList.add('upline')
        jobDetails.appendChild(upLine)

        //create div.comp-name append to upline
        const compName = document.createElement('div')
        compName.classList.add('comp-name')
        upLine.appendChild(compName)
        compName.textContent = data[i].company

        //create div.tag-new append to upline
        const tagNew = document.createElement('div')
        tagNew.classList.add('tag-new')
        upLine.appendChild(tagNew)
        let newTag;
        switch (data[i].new) {
            case true :
                newTag = 'NEW!';
                break; 
            default:
                newTag = null;
                tagNew.style.display = 'none'
        }
        tagNew.textContent = newTag;

        //create div.tag-featured append to upline
        const tagFeatured = document.createElement('div')
        tagFeatured.classList.add('tag-featured')
        upLine.appendChild(tagFeatured)
        let feat;
        switch (data[i].featured) {
            case true :
                feat = 'FEATURED';
                jobList.classList.add('featured')
                break; 
            default:
                feat = null;
                tagFeatured.style.display = 'none'
        }
        tagFeatured.textContent = feat;

        //create div.post-vacant
        const postVacant = document.createElement('div')
        postVacant.classList.add('post-vacant')
        jobDetails.appendChild(postVacant)
        postVacant.textContent = data[i].position;

        //create div.job-request
        const jobRequest = document.createElement('div')
        jobRequest.classList.add('job-request')
        jobDetails.appendChild(jobRequest)

        //create span.posted-time append to jobRequest
        const postTime = document.createElement('span')
        postTime.textContent = data[i].postedAt
        jobRequest.appendChild(postTime)

        //add &#183; (.) to jobRequest
        jobRequest.innerHTML += ' &#183; ';

        //create span.contract append to jobRequest
        const contractType = document.createElement('span')
        contractType.textContent = data[i].contract
        jobRequest.appendChild(contractType)

        //add &#183; (.) to jobRequest
        jobRequest.innerHTML += ' &#183; ';

        //create span.location append to jobRequest
        const countryLocation = document.createElement('span')
        countryLocation.textContent = data[i].location
        jobRequest.appendChild(countryLocation)

        //create div.job-skills and append to jobList
        const jobSkills = document.createElement('div')
        jobSkills.classList.add('job-skills')
        jobList.appendChild(jobSkills)

        //create div.filter-search for role and append to jobSkills
        const roleDiv = document.createElement('div')
        roleDiv.classList.add('filter-search')
        roleDiv.classList.add('skills')
        jobSkills.appendChild(roleDiv)
        roleDiv.textContent = data[i].role;
        jobList.classList.add(data[i].role);
        const levelDiv = document.createElement('div')
        levelDiv.classList.add('filter-search')
        levelDiv.classList.add('skills')
        jobSkills.appendChild(levelDiv)
        levelDiv.textContent = data[i].level;
        jobList.classList.add(data[i].level);
        //new loop for skills-require
        for (var j = 0; j < data[i].languages.length; j++) {
            //create div.filter-search for skills require
            const skillsRequire = document.createElement('div')
            skillsRequire.classList.add('filter-search')
            skillsRequire.classList.add('skills')
            jobSkills.appendChild(skillsRequire)
            skillsRequire.textContent = data[i].languages[j];
            jobList.classList.add(data[i].languages[j])
        }
        let item_filter = document.getElementsByClassName('filter-search');
        for (let i = 0; i < item_filter.length; i++) {
            const element = item_filter[i];
            element.addEventListener('click', addfilter);
        }
    }
});

function addfilter(element){
        let add = true;
        for (let i = 0; i < filterBody.childElementCount; i++) {
            const element_filter = filterBody.children.item(i);
            if(element.target.innerText == element_filter.innerText ){
                add = false;
            }
        }
        if(add){
            filterBody.innerHTML += "<li><span>" + element.target.innerText + 
            "</span><div class='clear-icon'><img src='/images/icon-remove.svg' alt='icon-remove' onclick='removefilter(this)'></div></li>";
        }
        update_filter();
    }

function update_filter(){
        for (let i = 0; i < jobList.length; i++) {
            let show = false;
            const element_job = jobList[i];
            for (let j = 0; j < filterBody.childElementCount; j++) {
                const active_filter = filterBody.children.item(j);          
                if(element_job.classList.contains(active_filter.innerText)){
                    show = true;
                    break;
                }
            }
            if(!show && filterBody.childElementCount != 0){
                element_job.style.display = 'none';
            }
            else{
                element_job.style.display = 'flex';
            }
        }
    }

function removefilter(element){
        element.parentNode.parentNode.remove();
        update_filter();
};
function removefilter_from_li(element){
        element.remove();
        update_filter();
};

function clearfilter(){
    for (let i = filterBody.childElementCount-1; i >= 0; i--) {
        const active_filter = filterBody.children.item(i);
        removefilter_from_li(active_filter);
    }   
}