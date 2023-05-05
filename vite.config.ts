import { defineConfig, loadEnv, ConfigEnv, UserConfig } from "vite";
import react from '@vitejs/plugin-react'
import unoCss from 'unocss/vite'
import { presetIcons, presetAttributify, presetUno } from 'unocss'
import { createHtmlPlugin } from "vite-plugin-html";
import { visualizer } from "rollup-plugin-visualizer";
import viteCompression from "vite-plugin-compression";
import path from "path"
import { wrapperEnv } from "./src/utils"

// https://vitejs.dev/config/
export default defineConfig((mode: ConfigEnv): UserConfig => {
  const env = loadEnv(mode.mode, process.cwd());
  const viteEnv = wrapperEnv(env);
  const rootPath = path.resolve(process.cwd())
  const srcPath = `${rootPath}/src`;

  return {
    resolve: {
      alias: {
        '~': rootPath,
        '@': srcPath,
      }
    },
    css: {
      preprocessorOptions: {
        scss: {
          additionalData:
              `
                @use "@/styles/global.scss" as *;
                @use "@/styles/util.scss" as *;
              `
        }
      }
    },
    server: {
      host: "0.0.0.0", // 服务器主机名，如果允许外部访问，可设置为"0.0.0.0"
      port: viteEnv.VITE_PORT,
      open: false,
      cors: true,
      // https: false,
      proxy: {
        "/api": {
          target: "http://127.0.0.1/", // easymock
          changeOrigin: true,
          rewrite: path => path.replace(/^\/api/, "")
        }
      }
    },
    plugins: [
        react(),
        createHtmlPlugin({
        inject: {
          data: {
            title: viteEnv.VITE_GLOB_APP_TITLE
          }
        }
      }),
      // * 是否生成包预览
      viteEnv.VITE_REPORT && visualizer(),
      // * gzip compress
      viteEnv.VITE_BUILD_GZIP &&
      viteCompression({
        verbose: true,
        disable: false,
        threshold: 10240,
        algorithm: "gzip",
        ext: ".gz"
      }),
      unoCss({
        presets: [presetIcons(), presetAttributify(), presetUno()],
        rules: [
          ['flex', {display: "flex"}],
          [/^text-(\d+)$/, ([, d]) => ({"font-size": `${Number(d) / 1920 * 100}vw`})],
          [/^m-(\d+)$/, ([, d]) => ({margin: `${Number(d) / 1920 * 100}vw`})],
          [/^mx-(\d+)$/, ([, d]) => ({
            "margin-left": `${Number(d) / 1920 * 100}vw`,
            "margin-right": `${Number(d) / 1920 * 100}vw`,
          })],
          [/^my-(\d+)$/, ([, d]) => ({
            "margin-top": `${Number(d) / 1080 * 100}vh`,
            "margin-bottom": `${Number(d) / 1080 * 100}vh`,
          })],
          [/^mt-(\d+)$/, ([, d]) => ({"margin-top": `${Number(d) / 1080 * 100}vh`})],
          [/^mb-(\d+)$/, ([, d]) => ({"margin-bottom": `${Number(d) / 1080 * 100}vh`})],
          [/^ml-(\d+)$/, ([, d]) => ({"margin-left": `${Number(d) / 1920 * 100}vw`})],
          [/^mr-(\d+)$/, ([, d]) => ({"margin-right": `${Number(d) / 1920 * 100}vw`})],
          [/^-mt-(\d+)$/, ([, d]) => ({"margin-top": `-${Number(d) / 1080 * 100}vh`})],
          [/^-mb-(\d+)$/, ([, d]) => ({"margin-bottom": `-${Number(d) / 1080 * 100}vh`})],
          [/^-ml-(\d+)$/, ([, d]) => ({"margin-left": `-${Number(d) / 1920 * 100}vw`})],
          [/^-mr-(\d+)$/, ([, d]) => ({"margin-right": `-${Number(d) / 1920 * 100}vw`})],
          [/^p-(\d+)$/, ([, d]) => ({padding: `${Number(d) / 1920 * 100}vw`})],
          [/^pt-(\d+)$/, ([, d]) => ({"padding-top": `${Number(d) / 1080 * 100}vh`})],
          [/^px-(\d+)$/, ([, d]) => ({
            "padding-left": `${Number(d) / 1920 * 100}vw`,
            "padding-right": `${Number(d) / 1920 * 100}vw`,
          })],
          [/^py-(\d+)$/, ([, d]) => ({
            "padding-top": `${Number(d) / 1080 * 100}vh`,
            "padding-bottom": `${Number(d) / 1080 * 100}vh`,
          })],
          [/^calc-h-(\d+)$/, ([, d]) => ({"height": `calc(100vh - ${Number(d) / 1080 * 100}vh)`})],
          [/^-calc-h-(\d+)$/, ([, d]) => ({"height": `-calc(100vh - ${Number(d) / 1080 * 100}vh)`})],
          [/^calc-w-(\d+)$/, ([, d]) => ({"width": `-calc(100vw - ${Number(d) / 1920 * 100}vw)`})],
          [/^-calc-w-(\d+)$/, ([, d]) => ({"width": `-calc(100vw - ${Number(d) / 1920 * 100}vw)`})],
          [/^pb-(\d+)$/, ([, d]) => ({"padding-bottom": `${Number(d) / 1080 * 100}vh`})],
          [/^pb-(\d+)$/, ([, d]) => ({"padding-bottom": `${Number(d) / 1080 * 100}vh`})],
          [/^pl-(\d+)$/, ([, d]) => ({"padding-left": `${Number(d) / 1920 * 100}vw`})],
          [/^pr-(\d+)$/, ([, d]) => ({"padding-right": `${Number(d) / 1920 * 100}vw`})],
          [/^-pt-(\d+)$/, ([, d]) => ({"padding-top": `-${Number(d) / 1080 * 100}vh`})],
          [/^-pb-(\d+)$/, ([, d]) => ({"padding-bottom": `-${Number(d) / 1080 * 100}vh`})],
          [/^-pl-(\d+)$/, ([, d]) => ({"padding-left": `-${Number(d) / 1920 * 100}vw`})],
          [/^-pr-(\d+)$/, ([, d]) => ({"padding-right": `-${Number(d) / 1920 * 100}vw`})],
          [/^w-(\d+)$/, ([, d]) => ({width: `${Number(d) / 1920 * 100}vw`})],
          [/^max-w-(\d+)$/, ([, d]) => ({"max-width": `${Number(d) / 1920 * 100}vw`})],
          [/^min-w-(\d+)$/, ([, d]) => ({"min-width": `${Number(d) / 1920 * 100}vw`})],
          [/^w-(\d+)$/, ([, d]) => ({width: `${Number(d) / 1920 * 100}vw`})],
          [/^b-(\d+)$/, ([, d]) => ({"border-width": `${Number(d) / 1920 * 100}vw`})],
          [/^b-t-(\d+)$/, ([, d]) => ({"border-top-width": `${Number(d) / 1080 * 100}vh`})],
          [/^b-b-(\d+)$/, ([, d]) => ({"border-bottom-width": `${Number(d) / 1080 * 100}vh`})],
          [/^b-l-(\d+)$/, ([, d]) => ({"border-left-width": `${Number(d) / 1920 * 100}vw`})],
          [/^b-r-(\d+)$/, ([, d]) => ({"border-right-width": `${Number(d) / 1920 * 100}vw`})],
          [/^border-(\d+)$/, ([, d]) => ({"border-width": `${Number(d) / 1920 * 100}vw`})],
          [/^border-x-(\d+)$/, ([, d]) => ({
            "border-left-width": `${Number(d) / 1920 * 100}vw`,
            "border-right-width": `${Number(d) / 1920 * 100}vw`,
          })],
          [/^border-y-(\d+)$/, ([, d]) => ({
            "border-top-width": `${Number(d) / 1080 * 100}vh`,
            "border-bottom-width": `${Number(d) / 1080 * 100}vh`,
          })],
          [/^border-t-(\d+)$/, ([, d]) => ({"border-top-width": `${Number(d) / 1080 * 100}vh`})],
          [/^border-b-(\d+)$/, ([, d]) => ({"border-bottom-width": `${Number(d) / 1080 * 100}vh`})],
          [/^border-l-(\d+)$/, ([, d]) => ({"border-left-width": `${Number(d) / 1920 * 100}vw`})],
          [/^border-r-(\d+)$/, ([, d]) => ({"border-right-width": `${Number(d) / 1920 * 100}vw`})],
          [/^rounded-(\d+)$/, ([, d]) => ({"border-radius": `${Number(d) / 1920 * 100}vw`})],
          [/^rounded-t-(\d+)$/, ([, d]) => ({
            "border-top-left-radius": `${Number(d) / 1920 * 100}vw`,
            "border-top-right-radius": `${Number(d) / 1920 * 100}vw`})
          ],
          [/^rounded-r-(\d+)$/, ([, d]) => ({
            "border-top-right-radius": `${Number(d) / 1920 * 100}vw`,
            "border-bottom-right-radius": `${Number(d) / 1920 * 100}vw`})
          ],
          [/^rounded-b-(\d+)$/, ([, d]) => ({
            "border-bottom-right-radius": `${Number(d) / 1920 * 100}vw`,
            "border-bottom-left-radius": `${Number(d) / 1920 * 100}vw` })
          ],
          [/^rounded-l-(\d+)$/, ([, d]) => ({
            "border-top-left-radius": `${Number(d) / 1920 * 100}vw`,
            "border-bottom-left-radius": `${Number(d) / 1920 * 100}vw` })
          ],
          [/^rounded-tl-(\d+)$/, ([, d]) => ({"border-top-left-radius": `${Number(d) / 1920 * 100}vw`})],
          [/^rounded-tr-(\d+)$/, ([, d]) => ({"border-top-right-radius": `${Number(d) / 1920 * 100}vw`})],
          [/^rounded-br-(\d+)$/, ([, d]) => ({"border-bottom-right-radius": `${Number(d) / 1920 * 100}vw`})],
          [/^rounded-bl-(\d+)$/, ([, d]) => ({"border-bottom-left-radius": `${Number(d) / 1920 * 100}vw`})],
          [/^indent-(\d+)$/, ([, d]) => ({"text-indent": `${Number(d) / 1920 * 100}vw`})],
          [/^left-(\d+)$/, ([, d]) => ({left: `${Number(d) / 1920 * 100}vw`})],
          [/^right-(\d+)$/, ([, d]) => ({right: `${Number(d) / 1920 * 100}vw`})],
          [/^top-(\d+)$/, ([, d]) => ({top: `${Number(d) / 1080 * 100}vh`})],
          [/^bottom-(\d+)$/, ([, d]) => ({bottom: `${Number(d) / 1080 * 100}vh`})],
          [/^h-(\d+)$/, ([, d]) => ({height: `${Number(d) / 1080 * 100}vh`})],
          [/^max-h-(\d+)$/, ([, d]) => ({"max-height": `${Number(d) / 1080 * 100}vh`})],
          [/^min-h-(\d+)$/, ([, d]) => ({"min-height": `${Number(d) / 1080 * 100}vh`})],
        ],
        shortcuts: {
          'wh-full': 'w-full h-full',
          'flex-center': 'flex justify-center items-center',
          'flex-col-center': 'flex-center flex-col',
          'flex-x-center': 'flex justify-center',
          'flex-y-center': 'flex items-center',
          'i-flex-center': 'inline-flex justify-center items-center',
          'i-flex-x-center': 'inline-flex justify-center',
          'i-flex-y-center': 'inline-flex items-center',
          'flex-col': 'flex flex-col',
          'flex-col-stretch': 'flex-col items-stretch',
          'i-flex-col': 'inline-flex flex-col',
          'i-flex-col-stretch': 'i-flex-col items-stretch',
          'flex-1-hidden': 'flex-1 overflow-hidden',
          'absolute-lt': 'absolute left-0 top-0',
          'absolute-lb': 'absolute left-0 bottom-0',
          'absolute-rt': 'absolute right-0 top-0',
          'absolute-rb': 'absolute right-0 bottom-0',
          'absolute-tl': 'absolute-lt',
          'absolute-tr': 'absolute-rt',
          'absolute-bl': 'absolute-lb',
          'absolute-br': 'absolute-rb',
          'absolute-center': 'absolute-lt flex-center wh-full',
          'fixed-lt': 'fixed left-0 top-0',
          'fixed-lb': 'fixed left-0 bottom-0',
          'fixed-rt': 'fixed right-0 top-0',
          'fixed-rb': 'fixed right-0 bottom-0',
          'fixed-tl': 'fixed-lt',
          'fixed-tr': 'fixed-rt',
          'fixed-bl': 'fixed-lb',
          'fixed-br': 'fixed-rb',
          'fixed-center': 'fixed-lt flex-center wh-full',
          'nowrap-hidden': 'whitespace-nowrap overflow-hidden',
          'ellipsis-text': 'nowrap-hidden overflow-ellipsis',
          'transition-base': 'transition-all duration-300 ease-in-out'
        },
      })
    ],
    esbuild: {
      pure: viteEnv.VITE_DROP_CONSOLE ? ["console.log", "debugger"] : []
    },
    // build configure
    build: {
      outDir: "dist",
      // esbuild 打包更快，但是不能去除 console.log，去除 console 使用 terser 模式
      minify: "esbuild",
      // minify: "terser",
      // terserOptions: {
      // 	compress: {
      // 		drop_console: viteEnv.VITE_DROP_CONSOLE,
      // 		drop_debugger: true
      // 	}
      // },
      rollupOptions: {
        output: {
          // Static resource classification and packaging
          chunkFileNames: "assets/js/[name]-[hash].js",
          entryFileNames: "assets/js/[name]-[hash].js",
          assetFileNames: "assets/[ext]/[name]-[hash].[ext]"
        }
      }
    }
  }
})
