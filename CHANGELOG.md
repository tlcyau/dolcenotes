# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.1.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [Unreleased]

### Added

- Turborepo monorepo with Yarn workspaces, a TanStack Start web app (`apps/web`) and a shared shadcn/ui package (`packages/ui`).
- Expo React Native mobile app (`apps/mobile`).
- Project README and changelog.
- `@workspace/db` package with Prisma 7 (PostgreSQL driver adapter), an initial `Tutor` / `Student` / `Note` schema with `JSONB` stroke storage, configured for Supabase (pooled `DATABASE_URL` at runtime, `DIRECT_URL` for the CLI).
- `docker-compose.yml` for local PostgreSQL, plus root `db:*` scripts (`db:push` to sync the schema).
- Web homepage shell: top bar with the treble-clef "dolcenotes" wordmark and a collapsible left nav (empty for now).
- Homepage calendar with month, week and day views, switched from a toggle in the top bar (kept in the URL as `?view=`). Clicking a date opens its day view.

## [0.1.0] - 2026-08-29

### Added

- Architecture specifications for the Expo React Native (mobile) and React + shadcn/ui (web) frontends.
- Core backend tech choices: NestJS, PostgreSQL + Prisma, and Redis + BullMQ.
- Dual-storage strategy for handwritten vector notes (Postgres `JSONB` + S3 pre-rendered thumbnails).
- Docker Compose local dev stack configuration for PostgreSQL, Redis and MinIO.

## [0.0.1] - 2026-08-01

### Added

- Initial project initiation and core requirement definitions for tutor lesson tracking and handwritten note capture.
