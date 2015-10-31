Template.postSubmit.events({
	'submit form': function(e){
		e.preventDefault();

		var time = new Date().getTime();
		var post = {
			url: $(e.target).find('[name=url]').val(),
			title: $(e.target).find('[name=title]').val(),
			message: $(e.target).find('[name=message]').val(),
			timestamp: time
		}

		Meteor.call('post',post,function(error,id){
			if(error){
				return alert(error.reason);
			}
		});

		Router.go('postsList');
	}
});