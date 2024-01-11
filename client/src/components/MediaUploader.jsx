/* eslint-disable react/prop-types */
import React, { useState } from "react";

// react-pintura
import { PinturaEditorModal } from "@pqina/react-pintura";

// pintura
import "@pqina/pintura/pintura.css";
import {
  // editor
  locale_en_gb,
  createDefaultImageReader,
  createDefaultImageWriter,
  createDefaultShapePreprocessor,

  // plugins
  setPlugins,
  plugin_crop,
  plugin_crop_locale_en_gb,
  plugin_finetune,
  plugin_finetune_locale_en_gb,
  plugin_finetune_defaults,
  plugin_filter,
  plugin_filter_locale_en_gb,
  plugin_filter_defaults,
  plugin_annotate,
  plugin_annotate_locale_en_gb,
  markup_editor_defaults,
  markup_editor_locale_en_gb,
} from "@pqina/pintura";

setPlugins(plugin_crop, plugin_finetune, plugin_filter, plugin_annotate);

const editorDefaults = {
  utils: ["crop", "finetune", "filter", "annotate"],
  imageReader: createDefaultImageReader(),
  imageWriter: createDefaultImageWriter(),
  shapePreprocessor: createDefaultShapePreprocessor(),
  ...plugin_finetune_defaults,
  ...plugin_filter_defaults,
  ...markup_editor_defaults,
  locale: {
    ...locale_en_gb,
    ...plugin_crop_locale_en_gb,
    ...plugin_finetune_locale_en_gb,
    ...plugin_filter_locale_en_gb,
    ...plugin_annotate_locale_en_gb,
    ...markup_editor_locale_en_gb,
  },
};


const MediaUploader = ({visible, imgSrc, setVisible, handleMediaConfirm}) => {
    console.log(imgSrc)
    const [result, setResult] = useState({
        name: imgSrc.name,
        url: ''
    });
    console.log(result)
  return (
    <div>
    {visible && (
      <PinturaEditorModal
        {...editorDefaults}
        src={imgSrc.url}
        onLoad={(res) => console.log("load modal image", res)}
        onHide={() => setVisible(false)}
        onProcess={({ dest }) => setResult({...result, url:URL.createObjectURL(dest)})}
      />
    )}
    {!!result.url.length && (handleMediaConfirm(result)
    )}
  </div>
  )
}

export default MediaUploader


