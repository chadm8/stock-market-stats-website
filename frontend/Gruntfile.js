module.exports = function(grunt) {
  grunt.loadNpmTasks("grunt-aws-s3");
  grunt.initConfig({
    aws_s3: {
      options: {
        access: "private",
        params: {
          CacheControl: "max-age=600, s-maxage=300",
        },
        differential: true,
        region: "us-east-1",
      },
      prod: {
        options: {
          bucket: "stock-market-stats",
        },
        files: [
          {
            expand: true,
            cwd: "dist/",
            src: ["**"],
            dest: "/",
          },
        ],
      },
    },
  });
  grunt.registerTask("deploy:prod", "aws_s3:prod");
};
