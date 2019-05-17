const unluler = [
  "a",
  "e",
  "ı",
  "i",
  "o",
  "ö",
  "u",
  "ü",
  "A",
  "E",
  "I",
  "İ",
  "O",
  "Ö",
  "U",
  "Ü"
];

const hecele = (str: string) => {
  let i = 0,
    k = 0,
    p = 0,
    j = 0;
  const str2: string[] = [];
  for (i = 0; str[i] != undefined; i++) {
    if (str[i] == " ") {
      // karakterleri gezerken bosluk denk gelirse sonraki karaktere gec
      continue;
    }

    if (unluler.indexOf(str[i]) !== -1) {
      // sesli harfi bul
      if (str[i + 1] == " ") {
        // bir sonraki karakter bosluk ise bosluga kadar yazdir
        for (j = p; j < i + 1; j++) {
          str2[k] = str[j];
          k++;
        }
        str2[k] = " ";
        k++;
        p = i + 2;
      } // bosluk degilse
      else {
        if (str[i + 2] == " ") {
          // 2 sonraki karakter bosluksa bosluga kadar yazdir
          for (j = p; j < i + 2; j++) {
            str2[k] = str[j];
            k++;
          }
          str2[k] = " ";
          k++;
          p = i + 3;
        } // 2 sonraki karakter bosluk degilse
        else {
          if (unluler.indexOf(str[i + 1]) !== -1) {
            // sesliden sonra gelen harf sesli ise
            for (
              j = p;
              j < i + 1;
              j++ // ikinci sesliye kadar yazdir.
            ) {
              str2[k] = str[j];
              k++;
            }
            str2[k] = "-";
            k++;
            p = i + 1;
          } // sesliden sonraki karakter sesli degilse
          else {
            {
              if (unluler.indexOf(str[i + 2]) !== -1) {
                // sessizden sonraki sesli ise
                for (
                  j = p;
                  j < i + 1;
                  j++ // sessize kadar yazdir
                ) {
                  str2[k] = str[j];
                  k++;
                }
                str2[k] = "-";
                k++;
                p = i + 1;
              } // sessizden sonraki sessiz ise
              else {
                if (unluler.indexOf(str[i + 3]) !== -1) {
                  // yanyana 2 sessizden sonraki sesli ise
                  for (
                    j = p;
                    j < i + 2;
                    j++ // 2. sessize kadar yazdir
                  ) {
                    str2[k] = str[j];
                    k++;
                  }
                  str2[k] = "-";
                  k++;
                  p = i + 2;
                } // yanyana 2 sessizden sonraki sesli degilse
                else {
                  if (str[i + 3] == " " || str[i + 3] == undefined) {
                    // 2 sessizden sonra bosluk varsa veya karakter dizisinin sonuysa
                    for (
                      j = p;
                      j < i + 3;
                      j++ // bosluga kadar yazdir
                    ) {
                      str2[k] = str[j];
                      k++;
                    }
                    str2[k] = " ";
                    k++;
                    p = i + 4;
                  } // 2 sessizden sonraki sessizse
                  else {
                    for (
                      j = p;
                      j < i + 3;
                      j++ // 2 sessizden sonraki sessize kadar yazdir
                    ) {
                      str2[k] = str[j];
                      k++;
                    }
                    str2[k] = "-";
                    k++;
                    p = i + 3;
                  }
                }
              }
            }
          }
        }
      }
    }
  }

  return str2;
};

const heceler = hecele("türkçedeki").join("");
console.log(heceler, heceler.length, "türkçedeki".length);
