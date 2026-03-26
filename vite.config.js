import path from "path";

export default ({ mode }) => {
  return {
    server: {
      open: "/sample/index.html",
    },
    build: {
      // Set the output directory
      outDir: "dist",
      // Enable library mode
      lib: {
        // Entry file (your main vanilla JS file)
        entry: path.resolve(__dirname, "main.js"),
        // The name of your library (used as a global variable in IIFE format)
        name: "CustomDecoupledEditor",
        // Output formats
        formats: ["iife"], // Only IIFE for script tag usage
        // The generated file name (optional)
        fileName: (format) => {
          return format === "iife" ? "main.js" : `main.${format}.js`;
        },
      },
      // Optional: configure Rollup output further
      rollupOptions: {
        output: {
          // Control CSS file name
          assetFileNames: (assetInfo) => {
            if (assetInfo.name && assetInfo.name.endsWith(".css")) {
              return "style.css";
            }
            if (assetInfo.name && assetInfo.name.endsWith(".png")) {
              return "images/[name].[ext]";
            }
            if (assetInfo.name && assetInfo.name.endsWith(".svg")) {
              return "icons/[name].[ext]";
            }
            return "assets/[name].[ext]";
          },
          // Control chunk file names
          chunkFileNames: "[name]-[hash].js",
          // Control entry file names (when not in lib mode)
          entryFileNames: "[name].js",
        },
      },
      // The lowest target is es2015.
      target: "es2015",
      // Generate source maps - only in development
      sourcemap: mode === "development",
      // Minify options
      minify: mode === "production" ? "terser" : false,
      // Terser options for production
      terserOptions:
        mode === "production"
          ? {
              compress: {
                drop_console: true, // Remove console.log in production
                drop_debugger: true,
              },
              mangle: {
                // Mangle variable names but preserve the global library name
                toplevel: true,
                reserved: ["CustomDecoupledEditor"], // Don't mangle the global variable
              },
            }
          : {},
    },
  };
};
