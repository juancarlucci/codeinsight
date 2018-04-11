console.log("Sanity insanitum: JS is working!");

var $projectsList;
var allProject = [];

$(document).ready(function() {
  //populate adter ready
  $projectsList = $("#projects-list");
  //index route
  $.ajax({
    method: "GET",
    url: "/api/projects",
    success: handleSuccess,
    error: handleError
  });

  function handleSuccess(json) {
    allProject = json;
    // pass `allProject` into the template function
    var projetsHtml = getAllProjectsHtml(allProject);

    // append html to the view
    $projectsList.append(projetsHtml);
  }
  
  function handleError(e) {
    console.log('uh oh');
    $('#projects-list').text('Failed to load projects, is the server working?');
  }
  
  function getProjectHtml(project) {
    console.log(project.title);
    return `<hr>
        <p>
          <b class="project-title">${project.title}</b>
          <span class="view-input" style="display: none">
            <input type="text" value="${project.title}" />
            </span>
            <p>
              ${project.description}
            </p>
            <button class="viewProjectBtn" data-id="${project._id}">View</button>
          skills ${project.skills}
          <br>
          </p>
        `;
  }

  function getAllProjectsHtml(projects) {
    return projects.map(getProjectHtml).join("");
  }
  
  //the secodn arg, '.viewProjectBtn' is event delegation
$projectsList.on('click', '.viewProjectBtn', function() {
  console.log('clicked viewProject button to', '/api/projects/'+$(this).attr('data-id'));
  $.ajax({
    method: 'GET',
    url: '/api/projects/'+$(this).attr('data-id'),
    success: viewProjectSuccess,
    error: viewProjectError
  });
});

function getProjectViewHtml(project) {
  console.log(project.title);
  return `<hr>
      <p>
        <b class="project-title">${project.title}</b>
        <span class="view-input" style="display: none">
          <input type="text" value="${project.title}" />
          </span>
          <p>
            ${project.description}
          </p>
          <img src="${project.image}" width="200px" alt="profile foto juan carlos">

        skills ${project.skills}
        <button class="viewBackBtn" data-id="${project._id}">Back</button>
        <br>
        </p>
      `;
}
//function to repopulate
function viewProjectSuccess(project) {
  //hide
  $('#content').hide('3000',function(){
    //after hide
    $('#content').empty();
    console.log(project);
  $('#content').append( getProjectViewHtml(project));
  $('#content').show('1000');
});
}
function viewProjectError(err) {
  console.log("view success",err);
}

}); //end docunment ready
