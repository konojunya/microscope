Posts = new Meteor.Collection('posts');

Posts.allow({
	update: ownsDocument(userId,post),
	remove: ownsDocument(userId,post)
});

Posts.deny({
	update: function(userId,post,fieldNames){
		return (_.without(fieldNames,'url','title').length > 0);
	}
});

Meteor.methods({
	post: function(postAttributes){
		var user = Meteor.user(),
		postWithSameLink = Posts.findOne({url: postAttributes.url});

		// user not login
		if(!user){
			throw new Meteor.Error(401, "You need to login");
		}
		//title is empty ?
		if(!postAttributes.title){
			throw new Meteor.Error(422, "Please fill in a headline");
		}
		//post link is new?
		if(postAttributes.url && postWithSameLink){
			throw new Meteor.Error(302, "This link has already been posted", postWithSameLink._id);
		}

		//pick out the whitelisted keys
		var post = _.extend(_.pick(postAttributes,'url','title','message','timestamp'),{
			title: postAttributes.title + (this.isSimulation?'(client)':'(server)'),
			userId: user._id,
			author: username
		});

		if(! this.isSimulation){
			var Future = Npm.require('fibers/future');
			var future = new Future();
			Meteor.setTimeout(function(){
				future.return();
			},5*1000);
			future.wait();
		}

		var postId = Posts.insert(post);

		return postId;
	}
});