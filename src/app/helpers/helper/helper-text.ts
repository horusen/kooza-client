import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class HelperText {
  // Permet d'afficher un nombre bien defini de caractere dans un texte
  strcut(text: string, wordCount: number) {
    let text1 = this.fromHtmlStringToText(text);
    // if text's length lower than wordCound(nbre of word we want), simply return the text
    if (text1 && text1.length < wordCount) {
      return text1 || '';
    }

    // Else if text's length greater than wordCount, return the cutted text with three dots wich is mean text's cutted before the end
    return `${text.substring(0, wordCount)}...`;
  }

  fromHtmlStringToText(htmlString: string): string | null {
    return new DOMParser().parseFromString(htmlString, 'text/html')
      .documentElement.textContent;
  }

  urlify(text: string) {
    const urlRegex =
      /(https?:\/\/)?[\w\-~]+(\.[\w\-~]+)+(\/[\w\-~@:%]*)*(#[\w\-]*)?(\?[^\s]*)?/gi;
    if (text) {
      return text.replace(
        urlRegex,
        (url: string) => '<a href="' + url + '">' + url + '</a>'
      );
    } else {
      return text;
    }
  }

  stringify(element: object) {
    return JSON.stringify(element);
  }

  capitalise(text: string) {
    return `${text.charAt(0).toUpperCase}${text.slice(1)}`;
  }

  snakeToCamelCase(text: string) {
    return text
      .toLowerCase()
      .replace(/([-_][a-z])/g, (group) =>
        group.toUpperCase().replace('-', '').replace('_', '')
      );
  }
}
