import googleGtagPlugin from '@docusaurus/plugin-google-gtag';
import type {LoadContext, Plugin} from '@docusaurus/types';
import path from 'node:path';

type PluginOptions = {
  trackingID: string | string[];
  anonymizeIP?: boolean;
};

export default function safeGoogleGtagPlugin(
  context: LoadContext,
  options: PluginOptions,
): Plugin | null {
  const trackingIDs = Array.isArray(options.trackingID)
    ? options.trackingID
    : [options.trackingID];
  const [firstTrackingID, ...remainingTrackingIDs] = trackingIDs;

  if (!firstTrackingID) {
    throw new Error('The Google gtag plugin requires at least one tracking ID.');
  }

  const plugin = googleGtagPlugin(context, {
    trackingID: [firstTrackingID, ...remainingTrackingIDs],
    anonymizeIP: options.anonymizeIP ?? false,
  });

  if (!plugin) {
    return null;
  }

  return {
    ...plugin,
    getClientModules() {
      return [path.join(__dirname, 'client')];
    },
  };
}
