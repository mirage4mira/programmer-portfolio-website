// navbar href scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        console.log(this.getAttribute('href'));
        document.querySelector(this.getAttribute('href')).scrollIntoView({
            behavior: 'smooth'
        });
    });
});

var mywork = [
    {
        "name": "Jobify MERN Stack App",
        "description": "A job posting website where users can post job ads, search for available jobs, and see stats of all the job posting. Built with MERN stack.",
        "tags": ["React", "HTML/CSS", "Mongodb", "Express"],
        "image_path": "images/jobify.png",
        "github_link": "https://github.com/mirage4mira/jobify",
        "preview_link": "https://jobify-ahhl.onrender.com"
    },
    {
        "name": "Chat App Website",
        "description": "A chat application landing page to introduce the chat app and showcase the app features. Built with Webflow.",
        "tags": ["HTML/CSS", "Webflow", "Figma"],
        "image_path": "images/chat-app.jpg",
        "github_link": "",
        "preview_link": "https://chat-app-david-ngu.webflow.io/"
    },
    {
        "name": "Team Collaboration App Website",
        "description": "A team collaboration app landing page to showcase the app features and reviews. Visitors can enter their email if they are interested. The website also have blogs. Built with Webflow.",
        "tags": ["HTML/CSS", "Webflow", "Figma"],
        "image_path": "images/team-app.jpg",
        "github_link": "",
        "preview_link": "https://team-app-david-ngu.webflow.io/"
    },
    {
        "name": "Caffeine Cafe Landing Page",
        "description": "An italian restaurant landing page to introduce the restaurant, showcase menus and promotions. Visitors can book reservations through the website. Built with Webflow.",
        "tags": ["HTML/CSS", "Webflow", "Figma"],
        "image_path": "images/caffeine-cafe.jpg",
        "github_link": "",
        "preview_link": "https://caffeine-cafe.webflow.io"
    },
];

$(document).ready(function () {

    //hide nav on click in mobile
    $('.navbar-nav .nav-link').click(function () {
        setTimeout(function () {
            $('.navbar-collapse').collapse('hide');
        }, 1500);
    });

    // tags
    var tags = [];

    mywork.forEach(function (work) {
        work.tags.forEach(function (tag) {
            tags.push(tag);
        })
    });

    tags = tags.sort();

    tags = tags.reduce(function (obj, tag) {
        if (!obj.hasOwnProperty(tag)) {
            obj[tag] = 0;
        }
        obj[tag]++;
        return obj;
    }, {});


    for (var tag in tags) {

        var cleanedTag = tag.replace("/", "-");

        $('.my-work__tab .nav-pills').append(`
            <li class="nav-item">
                <a class="nav-link" id="pills-${cleanedTag}-tab" data-toggle="pill" href="#pills-${cleanedTag}" role="tab"
                aria-controls="pills-profile" aria-selected="false">${tag} (${tags[tag]})</a>
            </li>
        `);

        $('.my-work__tab .tab-content').append(`
            <div class="tab-pane fade" id="pills-${cleanedTag}" role="tabpanel" aria-labelledby="pills-${cleanedTag}-tab"><div class="row"></div></div>
        `);

        // card
        mywork.forEach(function (work) {
            if (work.tags.indexOf(tag) != -1) {
                $(`#pills-${cleanedTag}>.row`).append(createWorkCard({ ...work }));
            }
        });
    }
    mywork.forEach(function (work) {
        $('#pills-all>.row').append(createWorkCard({ ...work }));
    });


    // submit btn
    $(".contact-form").submit(function (e) {
        e.preventDefault();
        $(".contact-form").fadeOut(200, function () { $(this).remove(); });
        var successMsg = $.parseHTML(`<div class="contact-form-submitted">Form successfully submitted!</div>`);
        $(successMsg).appendTo(".contact-form-block").hide().fadeIn(500);
    });
});


function createWorkCard({ image_path, name, description, preview_link, github_link, tags }) {

    html = $.parseHTML(`
    <div class="col-lg-4 col-md-6 col-sm-8 col-12 card-block">
        <div class="card">
    <img class="card-img-top" src="${image_path}" alt="${name}">
    <div class="card-body">
        <div class="card-body-top">
        <h5 class="card-title">${name}</h5>
        <div class="card-tags"></div>
        <p class="card-text">
        ${description}
        </p>
        </div>
      <div class="row">
        <div class="col-6">
        <a href="${preview_link}" target="_blank" class="btn btn-sm btn-light"><img src="images/svg/preview.svg">Preview</a>
        </div>
        <div class="col-6">
        ${github_link ? `<a href="${github_link}" target="_blank" class="btn btn-sm btn-outline-light github-repo-btn"><img src="images/svg/github-repo.svg" class="github-repo-svg">Github Repo</a>` : ''}
        
      </div>
    </div>
    </div>     
    </div>
    `);

    tags.forEach(function (tag) {
        $(html).find('.card-tags').append(`<div class="card-tag">${tag}</div>`);
    })
    return html;
}