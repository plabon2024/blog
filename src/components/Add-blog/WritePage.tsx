"use client"
import { useState, ChangeEvent, FormEvent } from "react";
import { Plus, Image, Link, Code, Video, X, Text } from "lucide-react";
import { useTheme } from "next-themes";

interface ContentBlock {
  id: number;
  type: "text" | "image" | "code" | "iframe" | "link";
  content: string;
}

const WritePage = () => {
  const [open, setOpen] = useState<boolean>(false);
  const [featuredImage, setFeaturedImage] = useState<string>("");
  const [title, setTitle] = useState<string>("");
  const [contentBlocks, setContentBlocks] = useState<ContentBlock[]>([]);
  const { theme } = useTheme();
  const addContentBlock = (type: ContentBlock["type"]) => {
    const newBlock: ContentBlock = {
      id: Date.now(),
      type: type,
      content: ""
    };
    setContentBlocks([...contentBlocks, newBlock]);
    setOpen(false);
  };

  const updateBlockContent = (id: number, content: string) => {
    setContentBlocks(
      contentBlocks.map((block) =>
        block.id === id ? { ...block, content } : block
      )
    );
  };

  const removeBlock = (id: number) => {
    setContentBlocks(contentBlocks.filter((block) => block.id !== id));
  };

  const handleFeaturedImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setFeaturedImage(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleBlockImageUpload = (id: number, e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        updateBlockContent(id, reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    
    const formData = {
      featuredImage,
      title,
      contentBlocks: contentBlocks.map(block => ({
        type: block.type,
        content: block.content
      }))
    };

    console.log("Form Data:", formData);
    console.log("JSON Format:", JSON.stringify(formData, null, 2));
  };

  const renderContentBlock = (block: ContentBlock, index: number) => {
    switch (block.type) {
      case "text":
        return (
          <div className={` relative p-4 `}>
            <textarea
              id={`textarea-${block.id}`}
              className={`w-full p-0 border-0 resize-none focus:outline-none text-lg leading-relaxed font-serif overflow-visible   ${theme === "light" ? "text-gray-800" : "text-gray-100"} `}
              rows={3}
              placeholder="Tell your story..."
              value={block.content}
              onChange={(e) => {
                updateBlockContent(block.id, e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              style={{ minHeight: '80px', height: 'auto' }}
              onInput={(e: any) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        );
      case "image":
        return (
          <div>
            <input
              type="file"
              id={`block-image-${block.id}`}
              accept="image/*"
              className="hidden"
              onChange={(e) => handleBlockImageUpload(block.id, e)}
            />
            <label
              htmlFor={`block-image-${block.id}`}
              className="block cursor-pointer"
            >
              {block.content ? (
                <img src={block.content} alt="Uploaded" className="w-full rounded" />
              ) : (
                <div className="flex items-center justify-center w-full py-12 border-2 border-dashed border-gray-200 rounded hover:border-gray-300 transition">
                  <div className="text-center">
                    <Image className="mx-auto mb-2 text-gray-300" size={40} />
                    <span className="text-sm text-gray-400">Click to upload image</span>
                  </div>
                </div>
              )}
            </label>
          </div>
        );
      case "code":
        return (
          <div className={ ` ${theme === "light" ? "bg-gray-50" : "bg-white/10"}	 rounded p-4 `}>
            <textarea
              id={`code-${block.id}`}
              className={    `w-full p-0 border-0 resize-none font-mono text-sm bg-transparent focus:outline-none ${theme === "light" ? "text-gray-800" : "text-gray-100"} overflow-visible `}
              rows={6}
              placeholder="// Enter code..."
              value={block.content}
              onChange={(e) => {
                updateBlockContent(block.id, e.target.value);
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
              style={{ minHeight: '120px', height: 'auto' }}
              onInput={(e: any) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
          </div>
        );
      case "iframe":
        return (
          <div>
            <input
              type="text"
              className="w-full p-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 text-gray-700 mb-3"
              placeholder="Paste embed URL..."
              value={block.content}
              onChange={(e) => updateBlockContent(block.id, e.target.value)}
            />
            {block.content && (
              <div className="rounded">
                <iframe
                  src={block.content}
                  className="w-full h-96"
                  title="Embedded content"
                />
              </div>
            )}
          </div>
        );
      case "link":
        return (
          <input
            type="url"
            className="w-full p-3 border-0 border-b border-gray-200 focus:outline-none focus:border-gray-400 text-blue-600"
            placeholder="https://..."
            value={block.content}
            onChange={(e) => updateBlockContent(block.id, e.target.value)}
          />
        );
      default:
        return null;
    }
  };

  return (
    <div className="min-h-screen container mx-auto ">
      {/* Main Content */}
      <form onSubmit={handleSubmit}>
        <div className="max-w-3xl mx-auto px-6 py-12">
          {/* Featured Image Upload */}
          {!featuredImage ? (
            <div className="mb-8">
              <input
                type="file"
                id="featured-image"
                accept="image/*"
                className="hidden"
                onChange={handleFeaturedImageUpload}
              />
              <label
                htmlFor="featured-image"
                className="flex items-center justify-center w-full py-16 border-2 border-dashed border-gray-200 rounded cursor-pointer hover:border-gray-300 transition"
              >
                <div className="text-center">
                  <Image className="mx-auto mb-3 text-gray-300" size={48} />
                  <span className="text-gray-400">Add a cover image</span>
                </div>
              </label>
            </div>
          ) : (
            <div className="mb-8 relative group">
              <img src={featuredImage} alt="Featured" className="w-full rounded" />
              <button
                type="button"
                onClick={() => setFeaturedImage("")}
                className="absolute top-4 right-4 p-2 bg-white rounded-full shadow-lg opacity-0 group-hover:opacity-100 transition"
              >
                <X size={16} className="text-gray-600" />
              </button>
            </div>
          )}

          {/* Title Input */}
          <div className="mb-8">
            <textarea
              className="w-full p-0 border-0 resize-none focus:outline-none text-5xl font-bold text-gray-900 placeholder-gray-300 leading-tight"
              rows={1}
              placeholder="Title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              style={{
                minHeight: '60px',
                fontFamily: 'Georgia, Cambria, "Times New Roman", Times, serif'
              }}
            />
          </div>

          {/* Content Blocks */}
          <div className="space-y-3">
            {contentBlocks.map((block, index) => (
              <div key={block.id} className="relative group">
                {/* Remove button - appears on hover at top right */}
                <button
                  type="button"
                  onClick={() => removeBlock(block.id)}
                  className="absolute -right-10 top-0 p-1 text-gray-400 hover:text-gray-600 opacity-0 group-hover:opacity-100 transition z-10"
                >
                  <X size={20} />
                </button>

                {/* Content */}
                <div className="relative">
                  {renderContentBlock(block, index)}
                </div>

              </div>
            ))}
          </div>

          {/* Add Content Block Controls */}
          <div className="flex items-center gap-1 mt-6">
            {/* Toggle Button */}
            <button
              type="button"
              onClick={() => {
                if (!open) {
                  setOpen(true);
                } else {
                  addContentBlock("text");
                }
              }}
              className="flex items-center justify-center w-8 h-8 rounded-full border border-gray-300 hover:border-gray-400 transition text-gray-600"
            >
              <Plus size={16} />
            </button>

            {/* Conditional Buttons */}
            {open && (
              <div className="flex items-center gap-1 ml-2">
                {/* Text */}
                <button
                  type="button"
                  onClick={() => addContentBlock("text")}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-gray-600"
                  title="Add text"
                >
                  <Text size={20} className="rotate-180" />
                </button>

                {/* Image Upload */}
                <button
                  type="button"
                  onClick={() => addContentBlock("image")}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-gray-600"
                  title="Add image"
                >
                  <Image size={20} />
                </button>

                {/* Code Block */}
                <button
                  type="button"
                  onClick={() => addContentBlock("code")}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-gray-600"
                  title="Add code"
                >
                  <Code size={20} />
                </button>

                {/* Iframe */}
                <button
                  type="button"
                  onClick={() => addContentBlock("iframe")}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-gray-600"
                  title="Add embed"
                >
                  <Video size={20} />
                </button>

                {/* Link */}
                <button
                  type="button"
                  onClick={() => addContentBlock("link")}
                  className="flex items-center justify-center w-9 h-9 rounded-full hover:bg-gray-100 transition text-gray-600"
                  title="Add link"
                >
                  <Link size={20} />
                </button>
              </div>
            )}
          </div>

          {/* Initial prompt when no content */}
          {contentBlocks.length === 0 && (
            <div className="mt-6">
              <button
                type="button"
                onClick={() => addContentBlock("text")}
                className="text-gray-400 hover:text-gray-600 text-lg font-serif"
              >
                Tell your story...
              </button>
            </div>
          )}

          {/* Submit Button */}
          <div className="mt-12 pt-8 border-t border-gray-200">
            <button
              type="submit"
              className="px-6 py-3 bg-green-600 text-white rounded-full hover:bg-green-700 transition font-medium"
            >
              Publish Story
            </button>
          </div>
        </div>
      </form>
    </div>
  );
};

export default WritePage;