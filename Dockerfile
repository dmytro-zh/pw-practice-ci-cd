FROM mcr.microsoft.com/playwright:v1.55.0-noble

RUN mkdir /app
WORKDIR /app
COPY . /app/

RUN npm install --force
RUN npx playwright install 
#--with-deps
# RUN npx tsc
# CMD ["npx", "playwright", "test", "--project=chromium"]
# RUN npx playwright test --project=chromium