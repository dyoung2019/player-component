import JSZip from 'jszip/dist/jszip';
/**
 * Load a resource from a path URL.
 */
 export function fetchPath(path: string): Promise<string> {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest();
    xhr.open('GET', path, true);
    xhr.responseType = 'arraybuffer';
    xhr.send();
    xhr.onreadystatechange = function() {
      if (xhr.readyState == 4 && xhr.status == 200) {
        JSZip.loadAsync(xhr.response)
          .then((zip: any) => {
            zip
              .file('manifest.json')
              .async('string')
              .then((manifestFile: string) => {
                const manifest = JSON.parse(manifestFile);

                if (!('animations' in manifest)) {
                  throw new Error('Manifest not found');
                }

                if (manifest.animations.length === 0) {
                  throw new Error('No animations listed in the manifest');
                }

                const defaultLottie = manifest.animations[0];

                zip
                  .file(`animations/${defaultLottie.id}.json`)
                  .async('string')
                  .then((lottieFile: string) => {
                    const lottieJson = JSON.parse(lottieFile);

                    if ('assets' in lottieJson) {
                      Promise.all(
                        lottieJson.assets.map((asset: any) => {
                          if (!asset.p) {
                            return;
                          }
                          if (zip.file(`images/${asset.p}`) == null) {
                            return;
                          }

                          return new Promise((resolveAsset: any) => {
                            zip
                              .file(`images/${asset.p}`)
                              .async('base64')
                              .then((assetB64: any) => {
                                asset.p = 'data:;base64,' + assetB64;
                                asset.e = 1;

                                resolveAsset();
                              });
                          });
                        }),
                      ).then(() => {
                        resolve(lottieJson);
                      });
                    }
                  });
              });
          })
          .catch((err: Error) => {
            reject(err);
          });
      }
    };
  });
}