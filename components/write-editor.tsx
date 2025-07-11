"use client";

import { useState, useRef, useCallback, useEffect } from 'react';
import { useEditor, EditorContent, BubbleMenu } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Image from '@tiptap/extension-image';
import CodeBlock from '@tiptap/extension-code-block';
import HorizontalRule from '@tiptap/extension-horizontal-rule';
import Link from '@tiptap/extension-link';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { 
  Select, 
  SelectContent, 
  SelectItem, 
  SelectTrigger, 
  SelectValue 
} from '@/components/ui/select';
import { 
  DropdownMenu, 
  DropdownMenuContent, 
  DropdownMenuItem, 
  DropdownMenuTrigger 
} from '@/components/ui/dropdown-menu';
import { 
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from '@/components/ui/dialog';
import { 
  Bold, 
  Italic, 
  Link as LinkIcon, 
  Quote,
  Heading1,
  Heading2,
  Plus,
  Image as ImageIcon,
  Code,
  Minus,
  Video,
  MoreHorizontal,
  Eye,
  Settings,
  Upload
} from 'lucide-react';

interface PlusMenuProps {
  editor: any;
  isOpen: boolean;
  onClose: () => void;
  position: { top: number; left: number };
}

function PlusMenu({ editor, isOpen, onClose, position }: PlusMenuProps) {
  const [imageUrl, setImageUrl] = useState('');
  const [videoUrl, setVideoUrl] = useState('');
  const [showImageDialog, setShowImageDialog] = useState(false);
  const [showVideoDialog, setShowVideoDialog] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  const insertImage = (url: string) => {
    if (url) {
      editor.chain().focus().setImage({ src: url }).run();
      setImageUrl('');
      setShowImageDialog(false);
      onClose();
    }
  };

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      // In a real app, you'd upload to a service like Cloudinary or AWS S3
      const url = URL.createObjectURL(file);
      insertImage(url);
    }
  };

  const insertVideo = (url: string) => {
    if (url) {
      // For simplicity, we'll insert as a link. In a real app, you'd embed the video
      editor.chain().focus().insertContent(`<p><a href="${url}" target="_blank">🎥 Video: ${url}</a></p>`).run();
      setVideoUrl('');
      setShowVideoDialog(false);
      onClose();
    }
  };

  const menuItems = [
    {
      icon: ImageIcon,
      title: 'Image',
      description: 'Upload or embed with a link',
      action: () => setShowImageDialog(true)
    },
    {
      icon: Video,
      title: 'Video',
      description: 'Embed a YouTube or Vimeo video',
      action: () => setShowVideoDialog(true)
    },
    {
      icon: Code,
      title: 'Code Block',
      description: 'Add a code snippet',
      action: () => {
        editor.chain().focus().insertContent('<pre><code></code></pre>').run();
        onClose();
      }
    },
    {
      icon: Minus,
      title: 'Divider',
      description: 'Add a horizontal divider',
      action: () => {
        editor.chain().focus().setHorizontalRule().run();
        onClose();
      }
    }
  ];

  if (!isOpen) return null;

  return (
    <>
      <div 
        className="plus-menu-dropdown"
        style={{ 
          position: 'absolute',
          top: position.top,
          left: position.left + 48,
          zIndex: 50
        }}
      >
        {menuItems.map((item, index) => (
          <div
            key={index}
            className="plus-menu-item"
            onClick={item.action}
          >
            <item.icon className="plus-menu-item-icon" />
            <div>
              <div className="plus-menu-item-text">{item.title}</div>
              <div className="plus-menu-item-desc">{item.description}</div>
            </div>
          </div>
        ))}
      </div>

      {/* Image Dialog */}
      <Dialog open={showImageDialog} onOpenChange={setShowImageDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Add Image</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Upload Image</label>
              <div 
                className="image-upload-area"
                onClick={() => fileInputRef.current?.click()}
              >
                <Upload className="w-8 h-8 mx-auto mb-2 text-gray-400" />
                <p className="text-sm text-gray-600">Click to upload an image</p>
              </div>
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />
            </div>
            <div className="relative">
              <div className="absolute inset-0 flex items-center">
                <span className="w-full border-t" />
              </div>
              <div className="relative flex justify-center text-xs uppercase">
                <span className="bg-white px-2 text-gray-500">Or</span>
              </div>
            </div>
            <div>
              <label className="text-sm font-medium mb-2 block">Image URL</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Paste image URL here..."
                  value={imageUrl}
                  onChange={(e) => setImageUrl(e.target.value)}
                />
                <Button onClick={() => insertImage(imageUrl)}>Add</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>

      {/* Video Dialog */}
      <Dialog open={showVideoDialog} onOpenChange={setShowVideoDialog}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Embed Video</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <div>
              <label className="text-sm font-medium mb-2 block">Video URL</label>
              <div className="flex space-x-2">
                <Input
                  placeholder="Paste YouTube or Vimeo URL here..."
                  value={videoUrl}
                  onChange={(e) => setVideoUrl(e.target.value)}
                />
                <Button onClick={() => insertVideo(videoUrl)}>Embed</Button>
              </div>
            </div>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

export function WriteEditor() {
  const [title, setTitle] = useState('');
  const [subtitle, setSubtitle] = useState('');
  const [category, setCategory] = useState('');
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState('');
  const [showPlusMenu, setShowPlusMenu] = useState(false);
  const [plusMenuPosition, setPlusMenuPosition] = useState({ top: 0, left: 0 });
  const [currentLine, setCurrentLine] = useState<HTMLElement | null>(null);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({
        heading: {
          levels: [1, 2, 3],
        },
      }),
      Placeholder.configure({
        placeholder: 'Tell your story...',
      }),
      Image.configure({
        HTMLAttributes: {
          class: 'rounded-lg',
        },
      }),
      CodeBlock.configure({
        HTMLAttributes: {
          class: 'bg-gray-900 text-gray-100 p-6 rounded-lg',
        },
      }),
      HorizontalRule,
      Link.configure({
        openOnClick: false,
      }),
    ],
    content: '',
    editorProps: {
      attributes: {
        class: 'prose prose-lg max-w-none focus:outline-hidden',
      },
    },
    onUpdate: ({ editor }) => {
      // Handle plus menu positioning
      const { selection } = editor.state;
      const { $from } = selection;
      
      if ($from.parent.textContent === '') {
        const pos = editor.view.coordsAtPos($from.pos);
        const editorRect = editor.view.dom.getBoundingClientRect();
        
        setPlusMenuPosition({
          top: pos.top - editorRect.top,
          left: 0
        });
        
        // Find the current empty paragraph
        const domNode = editor.view.domAtPos($from.pos).node;
        const paragraphNode = domNode.nodeType === Node.TEXT_NODE 
          ? domNode.parentElement 
          : domNode as HTMLElement;
        
        setCurrentLine(paragraphNode);
      } else {
        setCurrentLine(null);
      }
    },
  });

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag('');
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter(tag => tag !== tagToRemove));
  };

  const handleKeyPress = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      e.preventDefault();
      addTag();
    }
  };

  const handlePlusClick = () => {
    setShowPlusMenu(!showPlusMenu);
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (showPlusMenu && !event.target) {
        setShowPlusMenu(false);
      }
    };

    document.addEventListener('click', handleClickOutside);
    return () => document.removeEventListener('click', handleClickOutside);
  }, [showPlusMenu]);

  if (!editor) {
    return null;
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <div className="sticky top-16 bg-white/80 backdrop-blur-xs border-b px-6 py-4 flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Avatar className="h-8 w-8">
            <AvatarImage src="/avatars/01.png" alt="User" />
            <AvatarFallback>JD</AvatarFallback>
          </Avatar>
          <div>
            <p className="text-sm font-medium">John Doe</p>
            <p className="text-xs text-gray-500">Draft in {category || 'Uncategorized'}</p>
          </div>
        </div>
        
        <div className="flex items-center space-x-3">
          <Button variant="ghost" size="sm">
            <Eye className="h-4 w-4 mr-2" />
            Preview
          </Button>
          <Button variant="outline" size="sm">
            Save Draft
          </Button>
          <Button size="sm" className="bg-primary hover:bg-primary/90">
            Publish
          </Button>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button variant="ghost" size="sm">
                <MoreHorizontal className="h-4 w-4" />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
              <DropdownMenuItem>
                <Settings className="mr-2 h-4 w-4" />
                Story Settings
              </DropdownMenuItem>
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </div>

      <div className="editor-container">
        {/* Category Selection */}
        <div className="mb-8">
          <Select value={category} onValueChange={setCategory}>
            <SelectTrigger className="w-48 border-0 bg-gray-50 text-sm">
              <SelectValue placeholder="Choose a category" />
            </SelectTrigger>
            <SelectContent>
              <SelectItem value="technology">Technology</SelectItem>
              <SelectItem value="design">Design</SelectItem>
              <SelectItem value="business">Business</SelectItem>
              <SelectItem value="lifestyle">Lifestyle</SelectItem>
              <SelectItem value="development">Development</SelectItem>
              <SelectItem value="wellness">Wellness</SelectItem>
              <SelectItem value="finance">Finance</SelectItem>
              <SelectItem value="environment">Environment</SelectItem>
            </SelectContent>
          </Select>
        </div>

        {/* Title */}
        <div className="mb-4">
          <input
            type="text"
            placeholder="Title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full editor-title border-0 outline-hidden resize-none bg-transparent"
          />
        </div>

        {/* Subtitle */}
        <div className="mb-12">
          <input
            type="text"
            placeholder="Subtitle (optional)"
            value={subtitle}
            onChange={(e) => setSubtitle(e.target.value)}
            className="w-full editor-subtitle border-0 outline-hidden resize-none bg-transparent"
          />
        </div>

        {/* Tags */}
        <div className="mb-8">
          <div className="flex flex-wrap gap-2 mb-3">
            {tags.map((tag) => (
              <Badge 
                key={tag} 
                variant="secondary" 
                className="cursor-pointer hover:bg-red-100 hover:text-red-600 transition-colors"
                onClick={() => removeTag(tag)}
              >
                {tag} ×
              </Badge>
            ))}
          </div>
          <Input
            placeholder="Add tags (press Enter)"
            value={newTag}
            onChange={(e) => setNewTag(e.target.value)}
            onKeyPress={handleKeyPress}
            className="w-64 border-0 bg-gray-50 focus-visible:ring-0 text-sm"
          />
        </div>

        {/* Editor */}
        <div className="relative">
          {/* Bubble Menu for text formatting */}
          {editor && (
            <BubbleMenu
              editor={editor}
              tippyOptions={{ duration: 100 }}
              className="inline-toolbar"
            >
              <button
                onClick={() => editor.chain().focus().toggleBold().run()}
                className={editor.isActive('bold') ? 'is-active' : ''}
              >
                <Bold className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleItalic().run()}
                className={editor.isActive('italic') ? 'is-active' : ''}
              >
                <Italic className="w-4 h-4" />
              </button>
              <button
                onClick={() => {
                  const url = window.prompt('Enter URL:');
                  if (url) {
                    editor.chain().focus().setLink({ href: url }).run();
                  }
                }}
                className={editor.isActive('link') ? 'is-active' : ''}
              >
                <LinkIcon className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 1 }).run()}
                className={editor.isActive('heading', { level: 1 }) ? 'is-active' : ''}
              >
                <Heading1 className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleHeading({ level: 2 }).run()}
                className={editor.isActive('heading', { level: 2 }) ? 'is-active' : ''}
              >
                <Heading2 className="w-4 h-4" />
              </button>
              <button
                onClick={() => editor.chain().focus().toggleBlockquote().run()}
                className={editor.isActive('blockquote') ? 'is-active' : ''}
              >
                <Quote className="w-4 h-4" />
              </button>
            </BubbleMenu>
          )}

          {/* Plus Menu */}
          {currentLine && (
            <div
              className="plus-menu"
              style={{
                position: 'absolute',
                top: plusMenuPosition.top,
                left: plusMenuPosition.left - 48,
              }}
              onClick={handlePlusClick}
            >
              <Plus className="w-4 h-4 text-gray-600" />
            </div>
          )}

          <PlusMenu
            editor={editor}
            isOpen={showPlusMenu}
            onClose={() => setShowPlusMenu(false)}
            position={plusMenuPosition}
          />

          {/* Editor Content */}
          <EditorContent editor={editor} className="editor-focused" />
        </div>
      </div>
    </div>
  );
}