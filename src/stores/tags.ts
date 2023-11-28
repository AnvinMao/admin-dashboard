import { defineStore } from "pinia";
import { ref } from "vue";
import type { RouteLocationNormalized } from "vue-router";

export interface TagView extends Partial<RouteLocationNormalized> {
  title?: string;
}

export const useTagsStore = defineStore('tags', () => {
  
  const visitedViews = ref<TagView[]>([]);
  const cachedViews = ref<string[]>([]);

  /**
   * close visited view.
   * @param view 
   */
  const closeVisitedView = (view: TagView) => {
    const index = visitedViews.value.findIndex(v => v.fullPath === view.fullPath);
    index > -1 && visitedViews.value.splice(index, 1);
  }

  /**
   * close cached view.
   * @param view 
   */
  const closeCachedView = (view: TagView) => {
    const index = cachedViews.value.indexOf(view.name as string);
    index > -1 && cachedViews.value.splice(index, 1);
  }

  /**
   * Add visited view.
   * @param view 
   */
  const addVisitedView = (view: TagView) => {
    const exists = visitedViews.value.some(x => x.fullPath === view.fullPath);
    if (exists) return;

    const add = Object.assign({}, view, { title: view.meta?.title || 'NoName' });
    if (view.meta && view.meta.affix) {
      visitedViews.value.unshift(add);
    } else {
      visitedViews.value.push(add);
    }
  }

  /**
   * Add keepalive view name.
   * @param view 
   */
  const addCachedView = (view: TagView) => {
    const name = view.name as string;
    if (cachedViews.value.includes(name)) {
      return;
    }

    if (!view.meta?.noKeepAlive) {
      cachedViews.value.push(name);
    }
  }

  /**
   * Update visited views.
   * @param view 
   */
  const updateVisitedView = (view: TagView) => {
    for (let v of visitedViews.value) {
      if (v.fullPath === view.fullPath) {
        v = Object.assign(v, view);
        break;
      }
    }
  }
  
  /**
   * close left/right side view.
   * @param view 
   * @param left 
   */
  const closeSideView = (view: TagView, left: boolean) => {
    const index = visitedViews.value.findIndex(v => v.fullPath === view.fullPath);
    if (index === -1) {
      return;
    }

    visitedViews.value = visitedViews.value.filter((item, idx) => {
      if ((idx >= index && left) || (idx <= index && !left) || item.meta?.affix) {
        return true;
      }

      const cacheIndex = cachedViews.value.indexOf(item.name as string);
      if (cacheIndex > -1) {
        cachedViews.value.splice(cacheIndex, 1);
      }

      return false;
    })
  }

  /**
   * close other view.
   * @param view 
   */
  const closeOtherView = (view: TagView) => {
    visitedViews.value = visitedViews.value.filter(v => {
      return v.meta?.affix || v.fullPath === view.fullPath;
    });

    cachedViews.value = cachedViews.value.filter(name => {
      return name === (view.name as string)
    });
  }

  /**
   * close all view.
   */
  const closeAllView = () => {
    visitedViews.value = visitedViews.value.filter(v => v.meta?.affix);
    cachedViews.value = [];
  }

  const addView = (view: TagView) => {
    addVisitedView(view);
    addCachedView(view);
  }

  const closeView = (view: TagView) => {
    closeVisitedView(view);
    closeCachedView(view);
  }

  return {
    visitedViews,
    cachedViews,
    addView,
    closeView,
    addVisitedView,
    addCachedView,
    closeVisitedView,
    closeCachedView,
    updateVisitedView,
    closeSideView,
    closeOtherView,
    closeAllView,
  }
})