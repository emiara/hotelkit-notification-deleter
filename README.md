# Hotelkit Notification Deleter

A Chrome extension to streamline managing Hotelkit notifications by adding a "Delete All" feature.

## Overview

This extension enhances the Hotelkit notifications interface by allowing users to quickly delete all notifications, with options to preserve certain notifications based on tags. It works by sending POST requests to Hotelkit's notification endpoints: `notifications/all` and `notifications/delete`.

## Features

- **Delete All**: Instantly remove all notifications from your inbox.
- **Selective Deletion**: Delete all notifications except those marked with specific tags.

> _"I believe this feature should be built into Hotelkit by default. It may already be available in some hotel implementations, but I am unsure."_

## Planned Features

- **Time-based Deletion**: Choose a cutoff period (e.g., delete all notifications older than a week).
- **Confirmation Prompt**: Add an "Are you sure?" prompt to prevent accidental deletions.

## Disclaimer

Use responsibly
