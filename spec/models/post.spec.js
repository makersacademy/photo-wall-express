const mongoose = require('mongoose');

require('../mongodb_helper')
const Post = require('../../models/post');

describe('Post model', function() {
  beforeEach(function(done) {
      mongoose.connection.collections.posts.drop(function() {
          done();
      });
  });

  it('has a author', function() {
    const post = new Post({ author: 'Jake' });
    expect(post.author).toEqual('Jake');
  });

  it('can list all posts', async function() {
    const posts = await Post.find()
    expect(posts).toEqual([]);
  });

  it('can save a post', async function() {
    const post = new Post({ author: 'Karla', filePath: 'image2.jpg' });

    await post.save()
    const posts = await Post.find()
    expect(posts[0]).toMatchObject({ author: 'Karla', filePath: 'image2.jpg' });
  });
});
