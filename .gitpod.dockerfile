FROM gitpod/workspace-full

RUN ["npm", "install", "-g", "http-server"]
RUN ["npm", "install", "-g", "vercel"]

USER root

RUN curl https://cli-assets.heroku.com/install.sh | sh
RUN chown -R gitpod:gitpod /home/gitpod/.cache/heroku

USER gitpod
