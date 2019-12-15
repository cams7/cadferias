FROM br.com.cams7/http-server
ARG DIST_FILE=dist/cadferias
COPY ${DIST_FILE} /opt/cadferias
ENTRYPOINT ["sh", "-c", "http-server /opt/cadferias -p 3000"]