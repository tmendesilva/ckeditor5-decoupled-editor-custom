import path from "path";

export default {
  server: {
    open: "index.html",
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
    // Generate source maps
    sourcemap: false,
  },
};
