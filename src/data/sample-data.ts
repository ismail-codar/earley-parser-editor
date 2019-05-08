import { INode } from "../types";
import { value, FidanArray } from "@fidanjs/runtime";

const choice = (text: string, childs: INode[]): INode => {
  return {
    text: value(text),
    childsType: value("choice"),
    childs: value(childs) as FidanArray<INode[]>
  };
};

const ordered = (text: string, childs: INode[]): INode => {
  return {
    text: value(text),
    childsType: value("ordered"),
    childs: value(childs) as FidanArray<INode[]>
  };
};

const val = (text: string): INode => {
  return {
    text: value(text),
    childsType: value("value"),
    childs: null
  };
};

export const sampleData = (): INode => {
  /**
     * https://jsfiddle.net/2mb3w9c1/4/embedded/result/
     * 
  S -> CUMLE_SADE | CUMLE_YARDIMCILI
  CUMLE_SADE -> OZNE YUKLEM
  CUMLE_YARDIMCILI -> OZNE YARDIMCI YUKLEM
  YARDIMCI_BASIT -> NESNE | YER | ZAMAN
  YARDIMCI_ZAMAN_NESNE -> ZAMAN NESNE
  YARDIMCI_NESNE_ZAMAN -> NESNE ZAMAN
  YARDIMCI -> YARDIMCI_BASIT | YARDIMCI_ZAMAN_NESNE | YARDIMCI_NESNE_ZAMAN
  OZNE -> ahmet
  NESNE -> BELIRTILI_NESNE | BELIRTISIZ_NESNE
  BELIRTISIZ_NESNE -> yemek
  BELIRTILI_NESNE -> BELIRTISIZ_NESNE i
  YUKLEM -> YUKLEM_GECMIS | YUKLEM_GELECEK | YUKLEM_SIMDIKI
  YUKLEM_KOK -> ye
  YUKLEM_SIMDIKI -> YUKLEM_KOK yor
  YUKLEM_GECMIS -> YUKLEM_KOK di
  YUKLEM_GELECEK -> YUKLEM_KOK ecek
  ZAMAN -> ZAMAN_SIMDI | ZAMAN_GECMIS | ZAMAN_GELECEK
  ZAMAN_GECMIS -> dün
  ZAMAN_GELECEK -> yarın
  
  ahmet ye yor
  ahmet yemek ye ecek
  ahmet yarın ye ecek
  ahmet yarın yemek ye ecek
       */

  const YUKLEM_KOK = choice("YUKLEM_KOK", [
    val("ye"),
    val("gel"),
    val("git"),
    val("otur"),
    val("kalk"),
    val("ağla"),
    val("üzül"),
    val("sevin")
  ]);

  // TODO ozne alt grupları
  const OZNE = choice("OZNE", [
    val("ahmet"),
    val("ben"),
    val("sen"),
    val("biz"),
    val("onlar")
  ]);

  const YUKLEM = choice("YUKLEM", [
    ordered("YUKLEM_GECMIS", [YUKLEM_KOK, val("di")]),
    ordered("YUKLEM_GELECEK", [YUKLEM_KOK, val("ecek")]),
    ordered("YUKLEM_SIMDIKI", [YUKLEM_KOK, val("yor")])
  ]);

  const ZAMAN_SIMDI = choice("ZAMAN_SIMDI", [val("şu anda"), val("hemen")]);
  const ZAMAN_GECMIS = choice("ZAMAN_GECMIS", [
    val("dün"),
    val("önceki gün"),
    val("geçen sene")
  ]);
  const ZAMAN_GELECEK = choice("ZAMAN_GELECEK", [val("yarın"), val("ileride")]);

  const BELIRTISIZ_NESNE = choice("BELIRTISIZ_NESNE", [
    val("yemek"),
    val("kitap"),
    val("hasta"),
    val("masa")
  ]);
  const BELIRTILI_NESNE = ordered("BELIRTILI_NESNE", [
    BELIRTISIZ_NESNE,
    val("i")
  ]);

  const NESNE = choice("NESNE", [BELIRTILI_NESNE, BELIRTISIZ_NESNE]);
  const YER = choice("YER", [val("ankara"), val("dışarısı"), val("saha")]);
  const ZAMAN = choice("ZAMAN", [ZAMAN_SIMDI, ZAMAN_GECMIS, ZAMAN_GELECEK]);

  const YARDIMCI = choice("YARDIMCI", [
    choice("YARDIMCI_BASIT", [NESNE, YER, ZAMAN]),
    ordered("YARDIMCI_ZAMAN_NESNE", [ZAMAN, NESNE]),
    ordered("YARDIMCI_NESNE_ZAMAN", [NESNE, ZAMAN])
  ]);

  return choice("S", [
    ordered("CUMLE_SADE", [OZNE, YUKLEM]),
    ordered("CUMLE_YARDIMCILI", [OZNE, YARDIMCI, YUKLEM])
  ]);
};
