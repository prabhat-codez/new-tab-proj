FROM oven/bun:1 as base
WORKDIR /app

FROM base as install
RUN mkdir -p /temp/dev
COPY package.json bun.lockb /temp/dev/
RUN cd /temp/dev && bun install --frozen-lockfile

RUN mkdir -p /temp/prod
COPY package.json bun.lockb /temp/prod/
RUN cd /temp/prod && bun install --frozen-lockfile

FROM base AS prerelease
COPY --from=install /temp/dev/node_modules node_modules
COPY . .
RUN  bun run build


FROM base AS release
COPY --from=install /temp/prod/node_modules node_modules
COPY --from=prerelease /app/dist /app/dist
COPY --from=prerelease /app/package.json .

USER bun
EXPOSE 4173/tcp
ENTRYPOINT [ "bun", "preview", "--host" ]
