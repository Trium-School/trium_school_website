import { z } from 'zod';
export const schemas = {
  home: z.object({
    "hero": z.object({
      "trust_badge": z.string(),
      "tagline": z.string(),
      "subtitle": z.string(),
      "cta_primary": z.string(),
      "cta_secondary": z.string()
    }),
    "differentiators": z.object({
      "eyebrow": z.string(),
      "heading": z.string(),
      "subheading": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "number": z.string(),
        "title": z.string(),
        "subtitle": z.string(),
        "description": z.string(),
        "highlights": z.array(z.string())
      }))
    }),
    "founders_message": z.object({
      "eyebrow": z.string(),
      "pull_quote": z.string(),
      "paragraphs": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "closing": z.string(),
      "attribution": z.string()
    }),
    "programs": z.object({
      "heading": z.string(),
      "subheading": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "name": z.string(),
        "grades": z.string(),
        "highlight": z.string(),
        "description": z.string()
      }))
    }),
    "why_trium": z.object({
      "heading": z.string(),
      "features": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "description": z.string(),
        "stat": z.string()
      }))
    }),
    "stats": z.object({
      "heading": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "value": z.string(),
        "label": z.string()
      }))
    }),
    "testimonials": z.object({
      "heading": z.string(),
      "subheading": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "quote": z.string(),
        "name": z.string(),
        "detail": z.string()
      }))
    }),
    "admissions_process": z.object({
      "eyebrow": z.string(),
      "heading": z.string(),
      "steps": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "description": z.string(),
        "sub_items": z.array(z.object({
          "id": z.string(),
          "label": z.string(),
          "detail": z.string()
        })).optional()
      }))
    }),
    "admissions": z.object({
      "heading": z.string(),
      "subheading": z.string(),
      "cta": z.string(),
      "steps": z.array(z.object({
        "id": z.string(),
        "number": z.string(),
        "label": z.string()
      }))
    })
  }),
  admissions: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "heading": z.string(),
      "subheading": z.string()
    }),
    "process": z.object({
      "heading": z.string(),
      "steps": z.array(z.object({
        "id": z.string(),
        "number": z.string(),
        "title": z.string(),
        "description": z.string()
      }))
    }),
    "form": z.object({
      "heading": z.string(),
      "subheading": z.string(),
      "cta": z.string()
    }),
    "faqs": z.object({
      "heading": z.string(),
      "items": z.array(z.object({
        "id": z.string(),
        "question": z.string(),
        "answer": z.string()
      }))
    })
  }),
  academics: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "subtitle": z.string()
    }),
    "philosophy": z.object({
      "heading": z.string(),
      "body": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      })),
      "pillars": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "description": z.string()
      }))
    }),
    "programmes": z.array(z.object({
      "id": z.string(),
      "name": z.string(),
      "grades": z.string(),
      "age_range": z.string(),
      "description": z.string(),
      "highlights": z.array(z.object({
        "id": z.string(),
        "text": z.string()
      }))
    })),
    "cocurricular": z.object({
      "heading": z.string(),
      "subheading": z.string(),
      "areas": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "description": z.string()
      }))
    }),
    "cta": z.object({
      "heading": z.string(),
      "subheading": z.string(),
      "button": z.string()
    })
  }),
  campus: z.object({
    "hero": z.object({
      "eyebrow": z.string(),
      "title": z.string(),
      "subtitle": z.string()
    }),
    "intro": z.object({
      "heading": z.string(),
      "body": z.string()
    }),
    "facilities": z.array(z.object({
      "id": z.string(),
      "name": z.string(),
      "description": z.string(),
      "image_slot": z.string(),
      "tag": z.string()
    })),
    "gallery": z.object({
      "heading": z.string(),
      "subtitle": z.string(),
      "images": z.array(z.object({
        "src": z.string(),
        "alt": z.string(),
      }))
    }),
    "cta": z.object({
      "heading": z.string(),
      "body": z.string(),
      "button": z.string()
    })
  }),
  pages: {
    ourDifferentiator: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string()
      }),
      "differentiators": z.array(z.object({
        "id": z.string(),
        "title": z.string(),
        "body": z.array(z.string()),
        "highlights": z.array(z.string())
      })),
      "stages": z.array(z.object({
        "id": z.string(),
        "eyebrow": z.string(),
        "grades": z.string().optional(),
        "title": z.string(),
        "intro": z.string().optional(),
        "body": z.array(z.string()).optional(),
        "subjects": z.array(z.tuple([z.string(), z.string()])).optional()
      })),
      "daily_rhythm": z.object({
        "title": z.string(),
        "eyebrow": z.string(),
        "items": z.array(z.tuple([z.string(), z.string(), z.string()]))
      }),
      "weekly_rhythm": z.object({
        "title": z.string(),
        "days": z.array(z.string()),
        "rows": z.array(z.array(z.string())),
        "project": z.array(z.string())
      }),
      "cta": z.object({
        "heading": z.string(),
        "body": z.string(),
        "button": z.string()
      })
    }),
    beyondAcademics: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string()
      }),
      "experiences": z.array(z.object({
        "id": z.string(),
        "eyebrow": z.string(),
        "title": z.string(),
        "color": z.string(),
        "intro": z.string(),
        "description": z.string(),
        "skills": z.array(z.string())
      })),
      "realWorldEducation": z.object({
        "heading": z.string(),
        "description": z.string(),
        "projects": z.array(z.object({
          "id": z.string(),
          "eyebrow": z.string(),
          "title": z.string(),
          "color": z.string(),
          "problem": z.string(),
          "duration": z.string(),
          "description": z.string(),
          "ageGroup": z.string(),
          "mentor": z.string(),
          "focus": z.string(),
          "focusDescription": z.string(),
          "fieldConcepts": z.array(z.string()),
          "academicConcepts": z.array(z.string()),
          "realWorldConnections": z.array(z.string()),
          "phases": z.array(z.tuple([z.string(), z.string()]))
        }))
      }),
      "cta": z.object({
        "heading": z.string(),
        "body": z.string(),
        "button": z.string()
      })
    }),
    careers: z.object({
      "hero": z.object({
        "eyebrow": z.string(),
        "title": z.string(),
        "subtitle": z.string()
      }),
      "why": z.object({
        "heading": z.string(),
        "items": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "description": z.string()
        }))
      }),
      "openings": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "positions": z.array(z.object({
          "id": z.string(),
          "title": z.string(),
          "department": z.string(),
          "type": z.string(),
          "description": z.string()
        }))
      }),
      "apply": z.object({
        "heading": z.string(),
        "subheading": z.string(),
        "note": z.string()
      })
    })
  }
};
export type Schemas = typeof schemas;