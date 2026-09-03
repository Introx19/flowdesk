import React, { useEffect, useState } from 'react';
import { useSettings } from '../../contexts/SettingsContext';
import { AlertCircle, Loader2 } from 'lucide-react';
import { t, type Lang } from '../../i18n/texts';

(window as any).React = React;
(window as any).useState = useState;
(window as any).useEffect = useEffect;

interface PluginShellProps {
  plugin: any;
}

const AGREED_PLUGINS_KEY = 'tesseradesk-agreed-unverified-plugins';

function getAgreedPlugins(): Set<string> {
  try {
    const raw = localStorage.getItem(AGREED_PLUGINS_KEY);
    return new Set(raw ? JSON.parse(raw) : []);
  } catch {
    return new Set();
  }
}

function saveAgreedPlugin(id: string) {
  const set = getAgreedPlugins();
  set.add(id);
  localStorage.setItem(AGREED_PLUGINS_KEY, JSON.stringify([...set]));
}

export default function PluginShell({ plugin }: PluginShellProps) {
  const [Component, setComponent] = useState<React.ComponentType<any> | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme, language } = useSettings();
  const tr = (key: any) => t(language as Lang, key);

  // A plugin is "trusted" if it's verified by signature OR user already agreed to it before
  const isVerified = plugin.isVerified === true;
  const wasAgreed = getAgreedPlugins().has(plugin.id);
  const [agreedToRisk, setAgreedToRisk] = useState(isVerified || wasAgreed);

  const handleAgree = () => {
    saveAgreedPlugin(plugin.id);
    setAgreedToRisk(true);
  };

  useEffect(() => {
    if (!agreedToRisk) return;

    let isMounted = true;
    const loadPlugin = async () => {
      try {
        // Build plugin:// URL from absolute path
        // Normalize Windows backslashes to forward slashes
        let absPath = plugin.mainPath.replace(/\\/g, '/');
        // URL: plugin://localhost/C:/Users/... (keep the colon!)
        const pluginUrl = `plugin://localhost/${absPath}`;

        // @vite-ignore
        const mod = await import(/* @vite-ignore */ pluginUrl);

        if (isMounted) {
          if (mod.default) {
            setComponent(() => mod.default);
          } else {
            setError('Plugin has no default export.');
          }
        }
      } catch (err: any) {
        if (isMounted) {
          console.error('Failed to load plugin:', err);
          setError(err.message || 'Failed to load plugin');
        }
      }
    };

    loadPlugin();
    return () => { isMounted = false; };
  }, [plugin, agreedToRisk]);

  if (!agreedToRisk) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-6 text-center space-y-4">
        <div className="w-16 h-16 bg-red-500/20 text-red-500 rounded-full flex items-center justify-center">
          <AlertCircle size={32} />
        </div>
        <h2 className="text-xl font-bold text-red-500">{tr('dlcUnverifiedWarning')}</h2>
        <p className="text-sm opacity-70">
          {tr('dlcUnverifiedDesc1')} <strong>{plugin.name}</strong> {tr('dlcUnverifiedDesc2')} ({plugin.author || tr('dlcUnknownAuthor')}).{' '}
          {tr('dlcUnverifiedDesc3')}
        </p>
        <p className="text-sm opacity-70">
          {tr('dlcUnverifiedDesc4')}
        </p>
        <button
          onClick={handleAgree}
          className="mt-4 px-6 py-2 bg-red-600 hover:bg-red-700 text-white rounded-lg transition-colors font-medium shadow-lg"
        >
          {tr('dlcUnderstandRisk')}
        </button>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center h-full p-4 text-center">
        <AlertCircle size={48} className="text-red-500 mb-4" />
        <p className="text-red-500 font-bold">{tr('dlcLoadError')}{plugin.name}</p>
        <p className="text-sm opacity-50 mt-2">{error}</p>
      </div>
    );
  }

  if (!Component) {
    return (
      <div className="flex flex-col items-center justify-center h-full">
        <Loader2 size={32} className="animate-spin opacity-50 mb-2" />
        <p className="text-sm opacity-50">{tr('dlcLoading')}{plugin.name}...</p>
      </div>
    );
  }

  // Provide context API to the plugin
  const pluginContext = {
    theme,
    language,
    t: (key: string) => t(language as Lang, key as any),
    writeTextToClipboard: async (text: string) => {
      try { await navigator.clipboard.writeText(text); return true; } catch { return false; }
    },
    readTextFromClipboard: async () => {
      try { return await navigator.clipboard.readText(); } catch { return ''; }
    },
    openExternal: (url: string) => { window.electronAPI?.openExternal(url); }
  };

  return (
    <div className="h-full w-full overflow-hidden plugin-container">
      {plugin.hasCss && (
        <link rel="stylesheet" href={`plugin://localhost/${plugin.absolutePath.replace(/\\/g, '/').replace(/^([A-Za-z]):\//, '$1/')}/style.css`} />
      )}
      <React.Suspense fallback={
        <div className="flex items-center justify-center h-full"><Loader2 className="animate-spin" /></div>
      }>
        <Component context={pluginContext} />
      </React.Suspense>
    </div>
  );
}
